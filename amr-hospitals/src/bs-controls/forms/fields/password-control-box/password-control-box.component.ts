import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input, type OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordBoxes } from '../../../model/elements';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-control-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './password-control-box.component.html',
  styleUrl: './password-control-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordControlBoxComponent implements OnInit {

  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: PasswordBoxes;
  fgrp = input<FormGroup>();

  ngOnInit(): void { }
}
