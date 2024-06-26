import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CheckBoxes, Controls, DropDowns, FormDataVm, FormProperties, PasswordBoxes } from '../../model/elements';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { CheckboxesComponent } from '../fields/checkboxes/checkboxes.component';
import { DateBoxComponent } from '../fields/date-box/date-box.component';
import { DropdownBoxesComponent } from '../fields/dropdown-boxes/dropdown-boxes.component';
import { FilterDropdownBoxComponent } from '../fields/filter-dropdown-box/filter-dropdown-box.component';
import { NumberBoxComponent } from '../fields/number-box/number-box.component';
import { SearchBoxComponent } from '../fields/search-box/search-box.component';
import { TextBoxControlComponent } from '../fields/textbox-control/textbox-control.component';
import { PasswordControlBoxComponent } from '../fields/password-control-box/password-control-box.component';
import { ActButtonsComponent } from '../../buttons/act-buttons/act-buttons.component';
import { transformBsControl } from '../../bs-control-tranformer';
import { DateTimeBoxComponent } from '../fields/date-time-box/date-time-box.component';
import { FormChildrenComponent } from '../form-children/form-children.component';



@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextBoxControlComponent,
    PasswordControlBoxComponent,
    SearchBoxComponent,
    DateBoxComponent,
    NumberBoxComponent,
    DropdownBoxesComponent,
    MatButtonModule,
    CheckboxesComponent,
    FilterDropdownBoxComponent,
    ActButtonsComponent,
    DateTimeBoxComponent,
    FormChildrenComponent
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {

  form: FormGroup = new FormGroup({});
  protected _controls: Controls[] = [];

  status = input.required<boolean>();
  controls = input.required<FormDataVm[]>();
  props = input<FormProperties>(
    { id: 'form', name: 'form', class: '', legend: 'Complete the form', btnText: 'Save', direction: false, icon: 'save' }
  )

  submit = output<any>();

  ngOnInit(): void {
    for (let i = 0; i < this.controls().length; i++) {
      this._controls.push(transformBsControl(this.controls()[i]));
      // if (this._controls[i].children || this.controls()[i].children) {
      //   this._controls[i].children = this.controls()[i].children?.map(c => transformBsControl(c));
      // }
    }

    this._controls.forEach(o => {
      if (o.children) {
        let fg = new FormBuilder().array([]);
        this.form.addControl(o.name, fg);
      }
      else {
        let ctrl = new FormControl(o.value, o.validators, o.asyncCustomValidators);
        this.form.addControl(o.name, ctrl);
      }
    });
  }

  isFormControl(ctrl: string) {
    return this.form.get(ctrl) instanceof FormControl;
  }

  getFmCtrl(id: string) {
    return this.form.get(id) as FormControl;
  }

  getFdm(id: string) {
    // console.log(this.controls());
    // let x = this.controls().find(x => x.name === id)!.children!;
    // console.log(x);
    return this._controls.find(x => x.name === id)!!;
  }

  getFmArray(id: string) {
    return this.form.get(id) as FormArray;
  }

  f_submit(vals: any, edit: boolean) {
    // this.edit.subscribe(x => {
    this.submit.emit({ value: vals, edit });
    // })
  }

  toCheck(ctrl: Controls) {
    return ctrl as CheckBoxes
  }

  toPassword(ctrl: Controls) {
    return ctrl as PasswordBoxes
  }

  toDropDown(ctrl: Controls) {
    return ctrl as DropDowns
  }
}

export interface IFormSubmit<T> {
  value: T;
  edit?: boolean;
}