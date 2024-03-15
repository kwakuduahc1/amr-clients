import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from '@angular/material/input';
import { CheckBoxes } from '../../../model/elements';
@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) ctrl!: CheckBoxes;
  control!: FormControl;

  ngOnInit(): void {
    this.control = new FormControl(this.ctrl.value);
    if (this.ctrl.required)
      this.control.addValidators(Validators.required);
    this.ctrl.validators?.forEach(x => {
      this.control.addValidators(x)
    });
    this.form.addControl(this.ctrl.name, this.control)
  }
 }
