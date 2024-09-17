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
import { NdAverageAreaComponent } from './nd-dashboard/nd-average-area/nd-average-area.component';
import { NdPerformanceAreaComponent } from './nd-dashboard/nd-performance-area/nd-performance-area.component';
import { NdTableViewComponent } from './nd-dashboard/nd-table-view/nd-table-view.component';
import { NdByYearComponent } from './nd-dashboard/nd-by-year/nd-by-year.component';
import { TrackingDrComponent } from './mspos-dashboard/tracking-dr/tracking-dr.component';
import { SumaryChartBarComponent } from './mspos-dashboard/sumary-chart-bar/sumary-chart-bar.component';
import { MapAreaComponent } from './mspos-dashboard/map-area/map-area.component';
import { StatsTotalComponent } from './mspos-dashboard/stats-total/stats-total.component';
import { SosPieComponent } from './mspos-dashboard/sos-pie/sos-pie.component'; 



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
    SeDashboardComponent,
    NdAverageAreaComponent,
    NdPerformanceAreaComponent,
    NdTableViewComponent,
    NdByYearComponent,
    TrackingDrComponent,
    SumaryChartBarComponent,
    MapAreaComponent,
    StatsTotalComponent,
    SosPieComponent, 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
