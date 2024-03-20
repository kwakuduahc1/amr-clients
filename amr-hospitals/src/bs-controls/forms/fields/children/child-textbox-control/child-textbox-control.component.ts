import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { Controls, FormDataVm, TextBoxes } from '../../../../model/elements';
import { transformBsControl } from '../../../../bs-control-tranformer';

@Component({
  selector: 'app-child-textbox-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './child-textbox-control.component.html',
  styleUrl: './child-textbox-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChildTextBoxControlComponent {

  cp = input.required<ControlProps>();
  //ctrls = this.cp().controls.map(x => transformBsControl(x));
  // control = this.cp().control

  ngOnInit(): void {
    console.log(this.cp())
  }
}


export interface ControlProps {
  controls: TextBoxes;
  name: string;
  form: FormGroup;
  input: FormControl
}