import { Component, Input, inject, input, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { LoginHttpService } from '../../../http/login-http-service';
import { RegisterVm } from '../../../model/IUsers';
import { ActivityProvider } from '../../../providers/ActivityProvider';
import { StatusProvider } from '../../../providers/StatusProvider';
import { MatDialog } from '@angular/material/dialog'
import { ActButtonsComponent } from '../../../../bs-controls/buttons/act-buttons/act-buttons.component';
import { FormDataVm, FormProperties } from '../../../../bs-controls/model/elements';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { ConfirmationComponent } from '../../../../bs-controls/buttons/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';
import { Hospitals } from '../../../model/dtos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ActButtonsComponent,
    FormBuilderComponent
  ],
  providers: []
})
export class RegisterComponent {
  conf = inject(MatDialog);
  act = inject(ActivityProvider).act();
  router = inject(Router);
  @Input() hosps!: Hospitals[];

  http = inject(LoginHttpService);
  status = inject(StatusProvider);
  snack = inject(MatSnackBar);

  props: FormProperties = { name: 'form', id: 'form', class: '', legend: 'User information', btnText: 'Register', icon: 'user_add' }
  form: FormDataVm[] = registrationForm
  edit = signal(false);

  ngOnInit() {
    this.form[5].options = this.hosps?.map(x => {
      return {
        key: x.hospitalName,
        value: x.hospitalsID
      }
    });
  }

  register(res: { value: RegisterVm, edit: boolean }) {
    console.log(res.value);
    return;
    let pn: string[] = [];
    pn.push(res.value.phoneNumber as unknown as string);
    this.conf.open(ConfirmationComponent, {
      data: `Do you want to create this account`,
      width: '350px'
    }).afterClosed().pipe(
      filter(p => p),
      map(x => {
        return { ...res.value, phoneNumber: pn }
      }),
      switchMap(x => this.http.register(x))
    )
      .subscribe(_ => {
        this.snack.open(`The user account was created for ${res.value.fullName}`, 'Dismiss', {
          panelClass: 'snackbar-info'
        });
        // if (login.role.toLowerCase().includes('Project'.toLowerCase())) {
        this.router.navigate([`/auth/users`])
        // }
      });
  }
}


const registrationForm: FormDataVm[] = [
  {
    name: 'userName',
    control_type: 'textbox',
    label: 'User name',
    required: true,
    title: 'The username you want to associate this person with',
    validators: [{ property: 'minLen', check: 3 }, { property: 'maxLen', check: 25 }],
    hidden: false,
    type: 'text',
  },
  {
    name: 'fullName',
    control_type: 'textbox',
    validators: [{ property: 'minLen', check: 5 }, { property: 'maxLen', check: 50 }],
    label: 'Full name',
    required: true,
    title: 'Full name of the staff',
    type: 'text',
  },
  {
    name: 'password',
    control_type: 'password',
    label: 'Password',
    required: true,
    title: 'User password',
    type: 'text',
    validators: [{ property: 'minLen', check: 8 }, { property: 'maxLen', check: 20 }]
  },
  {
    name: 'confirmPassword',
    control_type: 'password',
    validators: [{ property: 'minLen', check: 8 }, { property: 'maxLen', check: 20 }],
    label: 'Confirm password',
    required: true,
    value: '',
    title: 'Confirm the password for the user',
  },
  {
    name: 'title',
    control_type: 'dropdown',
    validators: [{ property: 'inList', check: 4 }],
    label: 'Title',
    title: 'Your title',
    required: true,
    options: [{ value: 'Dr.' }, { value: 'Mr.' }, { value: 'Mrs.' }, { value: 'Ms.' }, { value: 'Prof.' }]
  },
  {
    name: 'hospitalsID',
    control_type: 'dropdown',
    label: 'Hospital',
    title: 'Select hospital',
    required: true,
    options: []
  },
  {
    name: 'phoneNumber',
    control_type: 'textbox',
    label: 'Phone number',
    type: 'tel',
    simpleChildren: 2,
    required: true,
    title: 'Phone Number',
    value: '',
    validators: [{ property: 'minLen', check: 10 }, { property: 'maxLen', check: 10 }]
  }
]
