import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';
import { UserAreaComponent } from './user-area/user-area.component';
import { UserSupComponent } from './user-sup/user-sup.component';
import { UserPosComponent } from './user-pos/user-pos.component'; 


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserAreaComponent,
    UserSupComponent,
    UserPosComponent, 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ], 
})
export class UserModule { }
