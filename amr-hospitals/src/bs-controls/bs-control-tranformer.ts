import { RequiredValidator, ValidatorFn, Validators } from "@angular/forms";
import { maxDateValidator, maxDateTodayValidator, minDateValidator, minDateTodayValidator, filterDropdownValidator } from "./Validation/CustomValidators";
import { Controls, TextBoxes, NumberBoxes, DatesBoxes, DropDowns, DropDownOptions, FormDataVm, ValidationProperties } from "./model/elements";

export function transformBsControl(field: FormDataVm) {
  let ctrl: Controls = {
    control_type: field.control_type,
    label: field.label,
    name: field.name,
    value: field.value,
    hidden: field.hidden,
    required: field.required,
    placeholder: field.placeholder,
    title: field.title,
    list: field.list,
    options: field.options,
    type: field.type,
    validators: [],
  };

  if (field?.validators && field?.validators?.length > 0) {
    ctrl.validators = getValidationsFn(field.validators, field.options)
  }
  if (ctrl.required) {
    ctrl.validators?.push(Validators.required)
  }

  if (field.children) {
    ctrl.control_type = 'array';
    ctrl.simpleChildren = false;
    ctrl.children = [];
    for (let i = 0; i < field.children.length; i++) {
      let cld_ctrl: Controls = {
        control_type: field.children[i].control_type,
        label: field.children[i].label,
        name: field.children[i].name,
        value: field.children[i].value,
        required: field.children[i].required,
        list: field.children[i].list,
        hidden: field.children[i].hidden,
        title: field.children[i].title,
        options: field.children[i].options,
        type: field.children[i].type
      }
      if (field.children[i].validators) {
        cld_ctrl.validators = getValidationsFn(field.children[i].validators as ValidationProperties[])
      }
      cld_ctrl = getCtrlType(cld_ctrl);
      ctrl.children?.unshift(cld_ctrl)
    }
  }
  else if (field.simpleChildren) {
    ctrl.control_type = 'array';
    ctrl.children = [];
    ctrl.simpleChildren = true;
    for (let i = 0; i < field.simpleChildren; i++) {
      let cld_ctrl: Controls = {
        control_type: field.control_type,
        label: `${field.label} ${i + 1}`,
        name: `${field.name}_${i}`,
        value: field.value,
        required: field.required,
        list: field.list,
        title: `Add ${field.title} no ${i + 1}`,
        options: field.options,
        isChild: true,
        type: field.type
      }
      if (field.validators) {
        cld_ctrl.validators = getValidationsFn(field.validators as ValidationProperties[]);
      }
      cld_ctrl = getCtrlType(cld_ctrl);
      ctrl.children?.push(cld_ctrl)
    }
  }
  return getCtrlType(ctrl);
}

export function getCtrlType(ctrl: Controls) {
  switch (ctrl.control_type) {
    case 'textbox':
      return ctrl as TextBoxes;
    case 'number':
      return ctrl as NumberBoxes;
    case 'date':
      return ctrl as DatesBoxes;
    case 'dropdown':
      return ctrl as DropDowns;
    default:
      return ctrl;
  }
}

function getValidationsFn(validators: ValidationProperties[], options?: DropDownOptions[]) {
  let vals: ValidatorFn[] = [];
  validators.forEach(x => {
    switch (x.property) {
      case 'minLen':
        vals.unshift(Validators.minLength(x.check as number));
        break;
      case 'max':
        vals.unshift(Validators.max(x.check as number));
        break;
      case 'maxLen':
        vals.unshift(Validators.maxLength(x.check as number));
        break;
      case 'min':
        vals.unshift(Validators.min(x.check as number));
        break;
      case 'maxDate':
        vals.unshift(maxDateValidator(new Date(x.check as string)));
        break;
      case 'maxTodayDate':
        vals.unshift(maxDateTodayValidator());
        break;
      case 'minDate':
        vals.unshift(minDateValidator(new Date(x.check as string)));
        break;
      case 'minTodayDate':
        vals.unshift(minDateTodayValidator());
        break;
      case "inList":
        vals.unshift(filterDropdownValidator(options!));
        break;
      default:
        break;
    }
  });
  return vals;
}