import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { LoginHttpService } from '../../../http/login-http-service';
import { ILogin, RegisterVm } from '../../../model/IUsers';
import { ActivityProvider } from '../../../providers/ActivityProvider';
import { StatusProvider } from '../../../providers/StatusProvider';
import { MatDialog } from '@angular/material/dialog'
import { ActButtonsComponent } from '../../../../bs-controls/buttons/act-buttons/act-buttons.component';
import { FormDataVm, FormProperties } from '../../../../bs-controls/model/elements';
import { transformBsControl } from '../../../../bs-controls/bs-control-tranformer';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { ConfirmationComponent } from '../../../../bs-controls/buttons/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';

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

  http = inject(LoginHttpService);
  status = inject(StatusProvider);
  snack = inject(MatSnackBar);

  props: FormProperties = { name: 'form', id: 'form', class: '', legend: 'User information', btnText: 'Register', icon: 'user_add' }
  form = hospitalForm;

  edit = new BehaviorSubject<{ edit: boolean }>({ edit: false });

  register(res: { value: RegisterVm, edit: boolean }) {
    this.conf.open(ConfirmationComponent, {
      data: `Do you want to create this account`,
      width: '350px'
    }).afterClosed().pipe(
      filter(p => p),
      map(x => {
        res.value.teamsID = 1;
        return res.value
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
  }
]

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
    name: 'rank',
    control_type: 'textbox',
    validators: [{ property: 'minLen', check: 5 }, { property: 'maxLen', check: 50 }],
    label: 'Rank',
    required: true,
    title: 'Rank',
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
    name: 'phoneNumber',
    control_type: 'textbox',
    label: 'Phone number',
    type: 'tel',
    simpleChildren: 2,
    required: true,
    validators: [{ property: 'minLen', check: 10 }, { property: 'maxLen', check: 10 }]
  }
]
