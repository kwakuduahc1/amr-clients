import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatesBoxes } from '../../../model/elements';

@Component({
  selector: 'app-date-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateBoxComponent {
  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: DatesBoxes;
  fgrp = input<FormGroup>();

  ngOnInit(): void { }
}
