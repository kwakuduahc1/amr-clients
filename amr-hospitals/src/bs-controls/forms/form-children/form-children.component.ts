import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Controls } from '../../model/elements';
import { MatIcon } from '@angular/material/icon';
import { ChildTextBoxControlComponent, ControlProps } from '../fields/children/child-textbox-control/child-textbox-control.component';
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
  fms = input.required<Controls>();
  farray = input.required<FormArray>();
  arr: Controls[][] = [];
  carrys = computed(() => {
    return this.arr;
  });
  section = input.required<string>();

  ngOnInit(): void {
    this.addCtrl(true);
  }

  addCtrl(first?: boolean) {

    // let arr: Controls[] = this.fms().map(f => transformBsControl(f));
    if (!this.fms().simpleChildren) {
      let fg = new FormGroup({});
      this.fms().children!.forEach(sc => {
        let ctrl = new FormControl<string>(sc.value, sc.validators, sc.asyncCustomValidators);
        fg.addControl(sc.name, ctrl);
      })
      this.farray().insert(this.farray().length, fg);
      this.arr.unshift(this.fms()!.children!);
    }
    else {
      if (first) {
        this.fms()!.children?.forEach(x => {
          let ctrl = new FormControl<string>(x.value, x.validators, x.asyncCustomValidators);
          this.farray().push(ctrl);
        })
        this.arr.push(this.fms()!.children!);
      }
      else {
        let fst = { ...this.fms()!.children?.at(0)! };
        let str = fst.label;
        const ix = str.lastIndexOf(' ');
        str = ix !== -1 ? str.substring(0, ix) : str;
        fst.name = `${fst.name}_${this.farray().length + 1}`;
        fst.label = `${str} ${this.farray().length + 1}`
        let ctrl = new FormControl('', fst?.validators)
        this.farray().insert(0, ctrl);
        this.arr.at(0)!.push(fst);
        // console.log(this.carrys())
      }
    }
  }

  getFmCtrl(ctrl: Controls, ix: number): ControlProps {
    if (this.fms().simpleChildren) {
      let c = this.farray().controls.at(ix) as FormControl;
      return { control: ctrl, input: c }
    } else {
      let c = this.farray().at(ix).get(ctrl.name) as FormControl;
      return { control: ctrl, input: c }
    }

  }
}
