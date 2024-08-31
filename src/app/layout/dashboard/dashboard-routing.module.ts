import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DealsDashboardComponent } from './deals-dashboard/deals-dashboard.component';
 
import { MsposDashboardComponent } from './mspos-dashboard/mspos-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'mspos-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'mspos-dashboard',
        component: MsposDashboardComponent,
      },
      {
        path: 'deals-dashboard',
        component: DealsDashboardComponent,
      }, 
     
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
