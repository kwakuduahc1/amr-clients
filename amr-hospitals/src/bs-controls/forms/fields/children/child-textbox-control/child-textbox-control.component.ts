import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { CheckBoxes, Controls, FormDataVm, TextBoxes } from '../../../../model/elements';
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

  box = computed(() => this.cp().control as TextBoxes);
}


export interface ControlProps {
  control: Controls;
  input: FormControl
}