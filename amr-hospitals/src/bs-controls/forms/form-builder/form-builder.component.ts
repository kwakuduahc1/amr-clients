import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, input } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { PasswordControlBoxComponent } from '../fields/password-control-box/password-control-box.component';
import { ActButtonsComponent } from '../../buttons/act-buttons/act-buttons.component';
import { Observable } from 'rxjs';
import { transformBsControl } from '../../bs-control-tranformer';
import { DateTimeBoxComponent } from '../fields/date-time-box/date-time-box.component';



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
    DateTimeBoxComponent
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

  @Output() submit = new EventEmitter<any>(true);

  ngOnInit(): void {
    for (let i = 0; i < this.controls().length; i++) {
      this._controls.push(transformBsControl(this.controls()[i]));
      if (this.controls()[i].children) {
        this._controls[i].children = this.controls()[i].children?.map(c => transformBsControl(c));
      }
    }

    this._controls.forEach(o => {
      if (o.children) {
        let fg = new FormBuilder().array([]);
        o.children.forEach(sc => {
          let ctrl = new FormControl<string>(sc.value, sc.validators, sc.asyncCustomValidators);
          fg.push(ctrl);
        })
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
    return this.form.controls[id] as FormControl;
  }

  getFmArray(id: string) {
    return this.form.controls[id] as FormArray;
  }

  fmChildArray(ctrl: string, ix: number) {
    return (this.getFmArray(ctrl).at(ix) as FormControl)
    // return (this.form.get(ctrl) as FormArray).at(ix);
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