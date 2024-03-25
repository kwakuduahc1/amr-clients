import { Routes } from '@angular/router';

export const Auth_Routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.page').then(r => r.AuthPage)
    // redirectTo: 'register',
    // pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component')
        .then(c => c.RegisterComponent)
  }
]