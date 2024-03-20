import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ActButtonsComponent } from '../../buttons/act-buttons/act-buttons.component';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxes, Controls, DropDowns, FormDataVm, FormProperties, PasswordBoxes } from '../../model/elements';
import { MatIcon } from '@angular/material/icon';
import { ChildTextBoxControlComponent, ControlProps } from '../fields/children/child-textbox-control/child-textbox-control.component';
import { transformBsControl } from '../../bs-control-tranformer';
@Component({
  selector: 'app-form-children',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ActButtonsComponent,
    MatIcon,
    ChildTextBoxControlComponent
  ],
  templateUrl: './form-children.component.html',
  styleUrl: './form-children.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormChildrenComponent {
  fms = input.required<FormDataVm[]>(); // template for additional controls
  farray = input.required<FormArray>();
  arr: Controls[][] = [];
  carrys = computed(() => {
    return this.arr;
  });
  form = input.required<FormGroup>();
  array_name = input.required<string>();
  props: FormProperties = { name: 'form', id: 'culture_form', class: '', legend: 'Culture results', btnText: 'Add', icon: 'add' }

  ngOnInit(): void {
    this.addCtrl();
  }

  addCtrl() {
    let arr: Controls[] = this.fms().map(f => transformBsControl(f));
    let fg = new FormGroup({});
    arr.forEach(sc => {
      let ctrl = new FormControl<string>(sc.value, sc.validators, sc.asyncCustomValidators);
      fg.addControl(sc.name, ctrl);
    })
    this.farray().insert(this.farray().length, fg);
    this.arr.push(arr);
  }

  getFmCtrl(ix: Controls): ControlProps {
    // let type = this.fms().at(ix)!;
    // let name = type.name;
    return { controls: ix, name: ix.name, form: this.form(), input: new FormControl() }
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
