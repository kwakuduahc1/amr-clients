import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntibioticsListComponent } from './components/antibiotics-list/antibiotics-list.component';
import { AntibioticsHttpService } from './antibiotics-http-service';

const routes: Routes = [
  {
    path: '',
    component: AntibioticsListComponent,
    resolve: {
      drugs: () => inject(AntibioticsHttpService).list(),
      antibiotics: () => inject(AntibioticsHttpService).list()
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntibioticsRoutingModule { }
