import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLogsRoutingModule } from './user-logs-routing.module';
import { UserLogsComponent } from './user-logs.component';


@NgModule({
  declarations: [
    UserLogsComponent
  ],
  imports: [
    CommonModule,
    UserLogsRoutingModule
  ]
})
export class UserLogsModule { }
