import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from '@angular/material/input';
import { ControlProps } from '../child-textbox-control/child-textbox-control.component';
import { CheckBoxes } from '../../../../model/elements';
@Component({
  selector: 'app-child-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './child-checkboxes.component.html',
  styleUrl: './child-checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildCheckboxesComponent {

  cp = input.required<ControlProps>();

  box = computed(() => this.cp().control as CheckBoxes);
}

