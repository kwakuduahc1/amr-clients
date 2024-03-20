import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { ControlProps } from '../child-textbox-control/child-textbox-control.component';
@Component({
  selector: 'app-child--dropdown-boxes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './child-dropdown-boxes.component.html',
  styleUrl: './child-dropdown-boxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildDropdownBoxesComponent {
  cp = input.required<ControlProps>();
  ngOnInit(): void { }
}