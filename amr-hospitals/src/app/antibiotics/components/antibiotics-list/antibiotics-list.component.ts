import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-antibiotics-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './antibiotics-list.component.html',
  styleUrl: './antibiotics-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AntibioticsListComponent { }
