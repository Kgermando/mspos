import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DealsDashboardComponent } from './deals-dashboard/deals-dashboard.component';
import { SharedModule } from '../../shared/shared.index';
import { MsposDashboardComponent } from './mspos-dashboard/mspos-dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DealsDashboardComponent,
    MsposDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
