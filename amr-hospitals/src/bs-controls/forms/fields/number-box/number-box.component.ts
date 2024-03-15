import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NumberBoxes } from '../../../model/elements';

@Component({
  selector: 'app-number-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './number-box.component.html',
  styleUrl: './number-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberBoxComponent {
  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: NumberBoxes;
  fgrp = input<FormGroup>();

  ngOnInit(): void { }
}