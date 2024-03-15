import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextBoxes } from '../../../model/elements';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent { 
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) ctrl!: TextBoxes;
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
