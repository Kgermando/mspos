import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';

import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { LayoutCommonComponent } from './common/layout-common/layout-common.component';  
import { ProfileComponent } from './profile/profile.component';
import { AreaListComponent } from './areas/area-list/area-list.component';
import { PosVenteListComponent } from './pos-vente/pos-vente-list/pos-vente-list.component';
import { SupListComponent } from './sups/sup-list/sup-list.component';
import { PosAreaCountComponent } from './areas/pos-area-count/pos-area-count.component';
import { SupAreaCountComponent } from './areas/sup-area-count/sup-area-count.component';
import { AsmListComponent } from './asm/asm-list/asm-list.component';
import { ManagerListComponent } from './managers/manager-list/manager-list.component';
import { AsmSupCountComponent } from './asm/asm-sup-count/asm-sup-count.component';
import { SupAsmComponent } from './sups/sup-asm/sup-asm.component';
import { SupAreComponent } from './areas/sup-are/sup-are.component';
import { ArePosComponent } from './pos-vente/are-pos/are-pos.component';
import { AreaCommuneComponent } from './areas/area-commune/area-commune.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    LayoutCommonComponent, 
    ProfileComponent, 
    AreaListComponent, 
    PosVenteListComponent,
    SupListComponent,
    PosAreaCountComponent,
    SupAreaCountComponent,
    AsmListComponent,
    ManagerListComponent,
    AsmSupCountComponent,
    SupAsmComponent,
    SupAreComponent,
    ArePosComponent,
    AreaCommuneComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ]
})
export class LayoutModule { }
