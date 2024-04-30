import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { HospitalsHttpService } from '../../../hospitals/hospitals-http-service';
import { StatusProvider } from '../../../providers/StatusProvider';
import { from, map, pipe, startWith, switchMap, take, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ResultsHttpService } from '../../results-http-service';
import { FormDataVm, FormProperties, TableHeaders } from '../../../../bs-controls/model/elements';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { SensitivityResult } from '../../../model/dtos';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-results-home',
  standalone: true,
  imports: [
    CommonModule,
    FormBuilderComponent,
    MatTableModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField
  ],
  templateUrl: './results-home.component.html',
  styleUrl: './results-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsHomeComponent {
  private hosp_http = inject(HospitalsHttpService);
  private http = inject(ResultsHttpService);
  private status = inject(StatusProvider).user;

  form = _form;
  props: FormProperties = { name: 'sense_form', id: 'sense_form', class: '', legend: 'Parameters', btnText: 'Search', icon: 'filter' }
  cols = [/*'organism', */'antibiotic', 'total', 'sensitivity']

  diags = this.hosp_http.diagnoses(1).pipe(take(1));
  antCtrl = new FormControl('');
  results = model<SensitivityResult[]>([]);

  // data = this.antCtrl.valueChanges
  //   .pipe(
  //     startWith(''),
  //     map(x => (x as string).toLowerCase()),
  //     switchMap(x => this.results()
  //       .pipe(

  //     )
  //     )
  //   )
  // data$ = this.antCtrl.valueChanges
  //   .pipe(
  //     startWith(''),
  //     map(x => (x as string).toLowerCase()),
  //     switchMap(x => this.results()
  //       // .filter(f =>
  //       //   f.organism.toLowerCase().includes(x) ||
  //       //   f.antibiotic.toLowerCase().includes(x))
  //     ),
  //     tap(x => console.log(x)),
  //     map(x => new MatTableDataSource<SensitivityResult>())
  //   );

  constructor() {
    this.hosp_http.diagnoses(1)
      .pipe(
        map(x => {
          return x.flatMap(p => {
            return { value: p.diagnosis, key: p.diagnosis }
          });
        }),
      )
      .subscribe(res => this.form[1].options = res)
  }
  ngOnInit(): void { }

  search(res: { value: { diagnosis: string, score: number } }) {
    this.http.sensitivity(1, res.value.diagnosis, res.value.score / 100)
      .pipe(
        map(x => {
          //  x.map(d => d.sensitivity = `${Number.parseInt(d.sensitivity) * 100}%`);
          return x;
        }),
      )
      .subscribe(res => {
        this.results.update(() => res);
      });
  }

}

const _form: FormDataVm[] = [
  {
    name: 'score',
    value: 90,
    control_type: 'number',
    label: 'Minimum sensitivity',
    required: true,
    title: 'The minimum sensitivity to be used',
    validators: [{ property: 'min', check: 0 }, { property: 'max', check: 100 }]
  },
  {
    name: 'diagnosis',
    control_type: 'dropdown',
    required: true,
    title: 'Select diagnosis',
    label: 'Diagnosis',
    value: 'Bloodstream infections',
    options: [
      {
        "value": "Bloodstream infections",
        "key": "Bloodstream infections"
      },
      {
        "value": "Meningitis and other bacterial central nervous system infections",
        "key": "Meningitis and other bacterial central nervous system infections"
      },
      {
        "value": "Lower respiratory infections and all related infections in the thorax",
        "key": "Lower respiratory infections and all related infections in the thorax"
      },
      {
        "value": "Infections of bones, joints, and related organs",
        "key": "Infections of bones, joints, and related organs"
      },
      {
        "value": "Bacterial infections of the skin and subcutaneous systems",
        "key": "Bacterial infections of the skin and subcutaneous systems"
      },
      {
        "value": "Peritoneal and intra-abdominal infections",
        "key": "Peritoneal and intra-abdominal infections"
      },
      {
        "value": "Urinary tract infections and pyelonephritis",
        "key": "Urinary tract infections and pyelonephritis"
      }
    ]
  }
]