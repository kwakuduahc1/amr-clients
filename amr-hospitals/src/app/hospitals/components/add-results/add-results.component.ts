import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormProperties, FormDataVm } from '../../../../bs-controls/model/elements';
import { Organisms, Hospitals, CultureResults } from '../../../model/dtos';
import { OrganismsService } from '../../../organisms/organisms-http-service';
import { TableDisplayComponent } from '../../../../bs-controls/display/table-display/table-display.component';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';

@Component({
  selector: 'app-add-results',
  standalone: true,
  imports: [
    CommonModule,
    FormBuilderComponent,
    TableDisplayComponent
  ],
  templateUrl: './add-results.component.html',
  styleUrl: './add-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddResultsComponent {
  protected organisms = input.required<Organisms[]>();
  hosp = input.required<Hospitals>({
    alias: 'hospital'
  });

  form = cultureForms;
  props: FormProperties = { name: 'form', id: 'culture_form', class: '', legend: 'Culture results', btnText: 'Add', icon: 'add' }
  protected edit = signal<boolean>(false);
  private http = inject(OrganismsService);
  ngOnInit(): void {
    let orgs = this.organisms().map(x => {
      return {
        key: x.organism,
        value: x.organismsID
      }
    })
    this.form[0].options = orgs;
  }

  save(res: { value: CultureResults, edit: boolean }) {
    // res.value.antibiotics = [];
    // res.value.diagnoses = [];
    this.http.add(res.value).subscribe()
  }
}

const cultureForms: FormDataVm[] = [
  {
    name: 'organismsID',
    control_type: 'dropdown',
    label: 'Organism',
    required: true,
    title: 'Select the organism',
  },
  {
    name: 'results',
    control_type: 'dropdown',
    label: 'Results',
    required: true,
    options: [{ value: 'Resistant' }, { value: 'Sensitive' }, { value: 'Indeterminate' }]
  },
  {
    name: 'gender',
    control_type: 'dropdown',
    label: 'Gender',
    options: [{ value: 'Male' }, { value: 'Female' }],
    required: true
  },
  {
    name: 'age',
    control_type: 'number',
    label: 'Age',
    required: true,
    validators: [{ property: 'min', check: 1 }, { property: 'max', check: 120 }]
  },
  {
    name: 'patientType',
    control_type: 'dropdown',
    label: 'Type',
    required: true,
    options: [{ value: 'IPD' }, { value: 'OPD' }]
  },
  {
    name: 'los',
    control_type: 'number',
    label: 'LoS',
    required: true,
    validators: [{ property: 'min', check: 0 }, { property: 'max', check: 180 }],
  },
  {
    name: 'outcome',
    control_type: 'dropdown',
    label: 'Outcome',
    required: true,
    options: [{ value: 'Died' }, { value: 'Discharged' }]
  },
  {
    name: 'dateDone',
    control_type: 'date',
    required: true,
    label: 'Date done',
    validators: [{ property: 'maxTodayDate', check: '' }]
  },
  {
    name: 'diagnoses',
    control_type: 'textbox',
    required: true,
    label: 'Diagnosis',
    children: [
      {
        name: 'diagnosis',
        label: 'Diagnosis',
        required: true,
        control_type: 'textbox',
        validators: [{ property: 'minLen', check: 3 }, { property: 'maxLen', check: 75 }]
      },
      {
        name: 'isPrimary',
        label: 'Primary',
        control_type: 'checkbox'
      }
    ]
  },
  {
    name: 'antibiotics',
    control_type: 'textbox',
    required: true,
    label: 'Antibiotics',
    children: [
      {
        name: 'drugName',
        label: 'Drug',
        required: true,
        control_type: 'textbox',
        validators: [{ property: 'minLen', check: 3 }, { property: 'maxLen', check: 75 }]
      }
    ]
  }
]

