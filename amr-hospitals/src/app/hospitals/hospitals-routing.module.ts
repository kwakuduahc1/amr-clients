import { Inject, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListHospitalsComponent } from './components/list-hospitals/list-hospitals.component';
import { HospitalsHttpService } from './hospitals-http-service';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';
import { OrganismsHttpService } from '../organisms/organisms-http-service';
import { AddResultsComponent } from './components/add-results/add-results.component';
import { AntibioticsHttpService } from '../antibiotics/antibiotics-http-service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ListHospitalsComponent,
    resolve: {
      hospitals: () => inject(HospitalsHttpService).list()
    }
  },
  {
    path: ':id',
    component: ViewHospitalComponent,
    resolve: {
      // organisms: () => inject(OrganismsService).list(),
      hospital: (route = inject(ActivatedRouteSnapshot)) => inject(HospitalsHttpService).find(Number(route.paramMap.get('id') as string))
    }
  },
  {
    path: ':id/add-results',
    component: AddResultsComponent,
    resolve: {
      organisms: () => inject(OrganismsHttpService).list(),
      antibiotics: () => inject(AntibioticsHttpService).list(),
      hospital: (route = inject(ActivatedRouteSnapshot)) => inject(HospitalsHttpService).find(Number(route.paramMap.get('id') as string))
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
