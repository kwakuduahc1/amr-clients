import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { NonNullableFormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonGrid, IonCol, IonRow, IonInput, IonSelect, IonSelectOption, IonList, IonDatetime, IonCheckbox, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, addSharp } from 'ionicons/icons';
import { Illnesses, Symptoms } from 'src/model/dtos';
import { DateTime } from "luxon";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
    CommonModule,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonList,
    IonDatetime,
    IonCheckbox,
    IonDatetimeButton,
    IonModal
  ],
})
export class Tab1Page {
  events = model.required<Illnesses[]>();
  symptoms: Symptoms[] = [];
  private fb = inject(NonNullableFormBuilder);
  sympsForm = this.fb.group({
    symptom: this.fb.control<string>('', [Validators.required, Validators.maxLength(50)]),
    symptomDate: this.fb.control<string>(DateTime.now().toISO()),
    resolved: this.fb.control<boolean>(false),
    dateResolved: this.fb.control<string | null>(null)
  });

  constructor() {
    addIcons({ addCircleOutline, addSharp });
    // set dateResolved to required if resolved is true
    this.sympsForm.get('resolved')!.valueChanges.subscribe(value => {
      if (value) {
        this.sympsForm.get('dateResolved')!.setValidators([Validators.required]);
      } else {
        this.sympsForm.get('dateResolved')!.clearValidators();
      }
      this.sympsForm.get('dateResolved')!.updateValueAndValidity();
    });
  }

  get isResolved() {
    return this.sympsForm.controls.resolved.value;
  }
  addSymptom(symps: any) {
    this.symptoms.push(symps);
    this.sympsForm.reset();
    console.log(this.symptoms);
  }

}
