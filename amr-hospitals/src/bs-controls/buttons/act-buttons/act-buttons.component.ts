import { Component, EventEmitter, Input, Output, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivityProvider } from '../../../app/providers/ActivityProvider';

@Component({
  selector: 'app-act-buttons',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './act-buttons.component.html',
  styleUrls: ['./act-buttons.component.scss']
})
export class ActButtonsComponent {
  form = input.required<FormGroup>();
  text = input.required<string>();
  isProcessing = inject(ActivityProvider).act().isProcessing;
  @Input() title = '';
  @Input() type: 'button' | 'submit' | 'search' = 'button';
  @Input() icon: string = ''
  @Output() btn_click = new EventEmitter(true);

  submit(e: any) {
    this.btn_click.emit(e)
  }

}
