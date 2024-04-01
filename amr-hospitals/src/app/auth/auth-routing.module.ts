import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { UserHttpService } from '../http/user-http-service';
import { LoginGuard } from '../guards/LoginGuard';
import { LoginComponent } from './components/login/login.component';
import { HospitalsHttpService } from '../hospitals/hospitals-http-service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: {
      users: () => inject(UserHttpService).users()
    },
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {
      hosps: () => inject(HospitalsHttpService).list()
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
