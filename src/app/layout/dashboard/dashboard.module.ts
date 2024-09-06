import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DealsDashboardComponent } from './deals-dashboard/deals-dashboard.component';
import { SharedModule } from '../../shared/shared.index';
import { MsposDashboardComponent } from './mspos-dashboard/mspos-dashboard.component';
import { NdDashboardComponent } from './nd-dashboard/nd-dashboard.component';
import { WdDashboardComponent } from './wd-dashboard/wd-dashboard.component';
import { SishDashboardComponent } from './sish-dashboard/sish-dashboard.component';
import { OosDashboardComponent } from './oos-dashboard/oos-dashboard.component';
import { SosDashboardComponent } from './sos-dashboard/sos-dashboard.component';
import { SeDashboardComponent } from './se-dashboard/se-dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DealsDashboardComponent,
    MsposDashboardComponent,
    NdDashboardComponent,
    WdDashboardComponent,
    SishDashboardComponent,
    OosDashboardComponent,
    SosDashboardComponent,
    SeDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
