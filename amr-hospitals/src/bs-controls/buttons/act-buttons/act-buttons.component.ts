import { Component, inject, input, output } from '@angular/core';
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
  isProcessing = inject(ActivityProvider).act();
  title = input.required<string>();
  type = input<'button' | 'submit' | 'search'>('button')
  icon = input<string>('add')
  btn_click = output()// new EventEmitter(true);

  submit(e: any) {
    this.btn_click.emit(e)
  }

}
