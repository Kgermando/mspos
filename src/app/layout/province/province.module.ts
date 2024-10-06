import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { ProvinceListComponent } from './province-list/province-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PosCountComponent } from './pos-count/pos-count.component';
import { AreaCountComponent } from './area-count/area-count.component';
import { SupCountComponent } from './sup-count/sup-count.component';
import { DrCountComponent } from './dr-count/dr-count.component';
import { ProvincePosformComponent } from './province-posform/province-posform.component';


@NgModule({
  declarations: [
    ProvinceComponent,
    ProvinceListComponent,
    PosCountComponent,
    AreaCountComponent,
    SupCountComponent,
    DrCountComponent,
    ProvincePosformComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    SharedModule,
  ]
})
export class ProvinceModule { }
