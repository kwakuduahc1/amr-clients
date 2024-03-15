import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivityProvider } from '../../../app/providers/ActivityProvider';

@Component({
  selector: 'app-dialog-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.scss']
})
export class DialogButtonComponent {
  props = input.required<ButtonProperties>();//{ text: 'Click', isProcessing: false, title: 'Click', icon: 'button', type: 'button' };
  isProcessing = inject(ActivityProvider).act().isProcessing;
  @Output() dialog_btn_clicked = new EventEmitter(true);

  btn_clicked() {
    this.dialog_btn_clicked.emit();
  }
}

export interface ButtonProperties {
  text: string;
  title: string;
  icon: string;
  type: 'button' | 'submit'
}