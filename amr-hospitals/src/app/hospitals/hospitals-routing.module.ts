import { Inject, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ListHospitalsComponent } from './components/list-hospitals/list-hospitals.component';
import { HospitalsHttpService } from './hospitals-http-service';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';
import { OrganismsService } from '../organisms/organisms-http-service';

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
      organisms: () => inject(OrganismsService).list(),
      hospital: (route = inject(ActivatedRouteSnapshot)) => inject(HospitalsHttpService).find(Number(route.paramMap.get('id') as string))
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
