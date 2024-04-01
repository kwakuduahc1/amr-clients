import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { Hospitals } from '../../../model/dtos';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { GoogleMap } from '@angular/google-maps';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-hospital',
  standalone: true,
  imports: [
    CommonModule,
    FormBuilderComponent,
    GoogleMap,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './view-hospital.component.html',
  styleUrl: './view-hospital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewHospitalComponent {
  hosp = input.required<Hospitals>({ alias: 'hospital' });
  mapOpts: Signal<google.maps.MapOptions> = computed(() => {
    return {
      center: {
        lng: this.hosp().longitude,
        lat: this.hosp().latitude,
        format: 'png',
        scale: 2,
        marker: `size=tiny|color=black|label=${this.hosp().hospitalName}`
      },
      zoom: 14
    }
  })
}