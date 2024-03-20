import { Component, inject, model, signal } from '@angular/core';
import { Hospitals } from '../../../model/dtos';
import { FormDataVm, FormProperties, TableHeaders } from '../../../../bs-controls/model/elements';
import { filter, map, switchMap, tap } from 'rxjs';
import { ConfirmationComponent } from '../../../../bs-controls/buttons/confirmation/confirmation.component';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { MatDialog } from '@angular/material/dialog';
import { HospitalsHttpService } from '../../hospitals-http-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TableDisplayComponent } from '../../../../bs-controls/display/table-display/table-display.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hospitals',
  standalone: true,
  imports: [
    FormBuilderComponent,
    TableDisplayComponent,
    CommonModule
  ],
  // providers: [Router],
  templateUrl: './list-hospitals.component.html',
  styleUrl: './list-hospitals.component.scss'
})
export class ListHospitalsComponent {

  hosps = model.required<Hospitals[]>({ alias: 'hospitals' });
  form = hospitalForm;
  props: FormProperties = { name: 'form', id: 'hosp_form', class: '', legend: 'Hospital information', btnText: 'Add', icon: 'add' }
  headers: TableHeaders = { caption: 'List of hospitals in the project', hospitalName: 'Hospital', type: 'Type', view: 'View', edit: 'Edit' }
  protected edit = signal<boolean>(false);

  private conf = inject(MatDialog);
  private http = inject(HospitalsHttpService);
  private snack = inject(MatSnackBar);

  constructor(private router: Router) { }

  ngOnInit() { }

  addHosp(res: { value: Hospitals, edit: boolean }) {
    this.conf.open(ConfirmationComponent, {
      data: `A new hospital will be created for data collections`,
      width: '350px'
    }).afterClosed().pipe(
      filter(p => p),
      map(() => {
        return res.value
      }),
      switchMap(x => this.http.add(x)),
      tap((x: Hospitals) => {
        this.hosps.update(() => [x, ...this.hosps()]);
      }),
      switchMap(x => this.snack.open(`A new hospital account was created for ${res.value.hospitalName}`, 'Dismiss', {
        panelClass: 'snackbar-info'
      }).afterDismissed())
    )
      .subscribe();
  }

  view(ev: Hospitals) {
    console.log(ev)
    this.router.navigate(['/hospitals', ev.hospitalsID])
  }
}

const hospitalForm: FormDataVm[] = [
  {
    name: 'hospitalName',
    control_type: 'textbox',
    label: 'Hospital name',
    required: true,
    title: 'The name of the hospital',
    validators: [{ property: 'minLen', check: 3 }, { property: 'maxLen', check: 100 }]
  },
  {
    name: 'longitude',
    control_type: 'number',
    required: true,
    title: 'Longitude',
    validators: [{ property: 'min', check: 0.3 }, { property: 'max', check: 12 }],
    label: 'Longitude'
  },
  {
    name: 'latitude',
    control_type: 'number',
    required: true,
    title: 'Latitude',
    validators: [{ property: 'min', check: 0.3 }, { property: 'max', check: 12 }],
    label: 'Latitude'
  },
  {
    name: 'type',
    control_type: 'dropdown',
    required: true,
    label: 'Type of hospital',
    title: 'The type of hospital',
    options: [{ value: 'Government' }, { value: 'CHAG' }, { value: 'Others' }],
    validators: [
      { property: 'minLen', check: 3 },
      { property: 'maxLen', check: 30 }
    ]
  }
]