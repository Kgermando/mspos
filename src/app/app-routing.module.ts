import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'web',
    loadChildren: () =>
      import('../app/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: 'error-pages',
    loadChildren: () =>
      import('./error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
