import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { PostformListComponent } from './postform-list/postform-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PosformUserComponent } from './posform-user/posform-user.component';
import { PosformProvinceComponent } from './posform-province/posform-province.component';
import { PosformAreaComponent } from './posform-area/posform-area.component';
import { PosformSupComponent } from './posform-sup/posform-sup.component';
import { PosformPosComponent } from './posform-pos/posform-pos.component';


@NgModule({
  declarations: [
    PosComponent,
    PostformListComponent,
    PosformUserComponent,
    PosformProvinceComponent,
    PosformAreaComponent,
    PosformSupComponent,
    PosformPosComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    SharedModule,
  ]
})
export class PosModule { }
