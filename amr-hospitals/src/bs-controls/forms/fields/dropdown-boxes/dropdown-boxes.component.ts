import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { DropDowns } from '../../../model/elements';
@Component({
  selector: 'app-dropdown-boxes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './dropdown-boxes.component.html',
  styleUrl: './dropdown-boxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownBoxesComponent {
  control = input.required<FormControl>();
  ctrl = input.required<DropDowns>();
}