import { Routes } from "@angular/router";

export const Results_Routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/results-home/results-home.component').then(x => x.ResultsHomeComponent)
    }
]