import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatesTimeBoxes } from '../../../model/elements';

@Component({
  selector: 'app-date-time-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-time-box.component.html',
  styleUrl: './date-time-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeBoxComponent {
  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: DatesTimeBoxes;
  fgrp = input<FormGroup>();

  ngOnInit(): void { }
}
