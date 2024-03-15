import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHospitalsComponent } from './components/list-hospitals/list-hospitals.component';
import { HospitalsHttpService } from './hospitals-http-service';

const routes: Routes = [
  {
    path: '',
    component: ListHospitalsComponent,
    resolve: {
      hospitals: () => inject(HospitalsHttpService).list()
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
