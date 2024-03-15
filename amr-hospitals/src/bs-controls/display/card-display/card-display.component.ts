import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
@Component({
  selector: 'app-card-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDisplayComponent {
  card = input.required<CardsProperties>();

}

export interface CardsProperties {
  title: string;
  subTitle: string | number | Date;
  content: string;
}
