import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { IUsers } from '../../../model/IUsers';
import { StatusProvider } from '../../../providers/StatusProvider';
import { FormDataVm, FormProperties } from '../../../../bs-controls/model/elements';
import { BsControlsModule } from '../../../../bs-controls/bs-controls-module';
import { transformBsControl } from '../../../../bs-controls/bs-control-tranformer';
import { Router, RouterModule } from '@angular/router';
import { ActivityProvider } from '../../../providers/ActivityProvider';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    BsControlsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {


  route = inject(Router);
  form = loginForm;//.map(x => transformBsControl(x));
  act = inject(ActivityProvider).act();

  props: FormProperties = { name: 'form', id: 'form', class: '', legend: 'User information', btnText: 'Login', icon: 'users' };
  status = inject(StatusProvider);

  edit = signal(false);

  ngOnInit(): void { }

  login(login: { value: IUsers, edit: boolean }): void {
    this.status.login(login.value)
      .subscribe(() => this.route.navigate(['/']));
  }
}

const loginForm: FormDataVm[] = [
  {
    name: 'username',
    label: 'User name',
    required: true,
    type: 'text',
    list: [],
    value: '',
    placeholder: '',
    title: 'User name',
    control_type: 'textbox',
    validators: [{ property: 'maxLen', check: 20 }, { 'property': 'minLen', check: 3 }],
  },
  {
    name: 'password',
    label: 'Password',
    required: true,
    type: 'text',
    value: '',
    placeholder: '',
    title: 'Password',
    control_type: 'password',
    validators: [{ property: 'maxLen', check: 20 }, { 'property': 'minLen', check: 8 }],
  },
]