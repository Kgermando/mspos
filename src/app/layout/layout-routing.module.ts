import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';
import { AreaListComponent } from './areas/area-list/area-list.component';
import { PosVenteListComponent } from './pos-vente/pos-vente-list/pos-vente-list.component';
import { SupListComponent } from './sups/sup-list/sup-list.component';
import { AsmListComponent } from './asm/asm-list/asm-list.component';
import { ManagerListComponent } from './managers/manager-list/manager-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'provinces',
        loadChildren: () =>
          import('./province/province.module').then(
            (m) => m.ProvinceModule
          ),
      },
      {
        path: 'ares/ares-list',
        component: AreaListComponent,
      },
      {
        path: 'vente/pos-list',
        component: PosVenteListComponent,
      },
      {
        path: 'supervisors/sup-list',
        component: SupListComponent,
      },
      {
        path: 'asm/asm-list',
        component: AsmListComponent,
      },
      {
        path: 'managers/manager-list',
        component: ManagerListComponent,
      },
      {
        path: 'pos',
        loadChildren: () =>
          import('./posform/pos.module').then(
            (m) => m.PosModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'users-logs/activity',
        loadChildren: () =>
          import('./user-logs/user-logs.module').then(
            (m) => m.UserLogsModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
