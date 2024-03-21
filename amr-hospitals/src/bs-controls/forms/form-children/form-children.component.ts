import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Controls, FormDataVm } from '../../model/elements';
import { MatIcon } from '@angular/material/icon';
import { ChildTextBoxControlComponent, ControlProps } from '../fields/children/child-textbox-control/child-textbox-control.component';
import { transformBsControl } from '../../bs-control-tranformer';
import { ChildDropdownBoxesComponent } from '../fields/children/child-dropdown-boxes/child-dropdown-boxes.component';
import { ChildCheckboxesComponent } from '../fields/children/child-checkboxes/child-checkboxes.component';
@Component({
  selector: 'app-form-children',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    ChildTextBoxControlComponent,
    ChildDropdownBoxesComponent,
    ChildCheckboxesComponent
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
  section = input.required<string>();
  // props: FormProperties = { name: 'form', id: 'culture_form', class: '', legend: 'Culture results', btnText: 'Add', icon: 'add' }

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

  getFmCtrl(ctrl: Controls, ix: number): ControlProps {
    let c = this.farray().at(ix).get(ctrl.name) as FormControl;
    return { control: ctrl, input: c }
  }
}
