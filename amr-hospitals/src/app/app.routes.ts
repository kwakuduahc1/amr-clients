import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
