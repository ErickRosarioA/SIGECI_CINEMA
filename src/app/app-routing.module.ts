import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { WelcomeCardComponent } from './pages/welcome-card/welcome-card.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeCardComponent
  },
  {
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: 'ADMIN'},
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./pages/guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**',
    component: WelcomeCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
