import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { TextBoxes } from '../../../model/elements';
@Component({
  selector: 'app-textbox-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './textbox-control.component.html',
  styleUrl: './textbox-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBoxControlComponent {

  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: TextBoxes;
  fgrp = input<FormGroup>();

  ngOnInit(): void { }
}
