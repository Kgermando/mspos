import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProvinceListComponent } from './province-list/province-list.component';
import { ProvinceComponent } from './province.component';
import { ProvincePosformComponent } from './province-posform/province-posform.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinceComponent,
    children: [
      {
        path: '',
        redirectTo: 'province-list',
        pathMatch: 'full'
      },
      {
        path: 'province-list',
        component: ProvinceListComponent,
      },
      {
        path: ':id/posform',
        component: ProvincePosformComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
