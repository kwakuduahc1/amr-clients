import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosisComponent { }
