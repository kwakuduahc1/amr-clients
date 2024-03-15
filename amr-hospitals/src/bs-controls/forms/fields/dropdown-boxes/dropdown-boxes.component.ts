import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { DropDowns, DropDownOptions } from '../../../model/elements';
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
  @Input({ required: true }) ctrl!: DropDowns;

  ngOnInit(): void { }
}