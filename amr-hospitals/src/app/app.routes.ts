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
    },
    {
        path: 'hospitals',
        loadChildren: () => import('./hospitals/hospitals.module').then(x => x.HospitalsModule)
    },
    {
        path: 'antibiotics',
        loadChildren: () => import('./antibiotics/antibiotics.module').then(x => x.AntibioticsModule)
    }
];
