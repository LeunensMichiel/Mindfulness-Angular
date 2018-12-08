import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AdminListComponent} from './admin-list/admin-list.component';
import {SuperAdminAuthGuard} from './super-admin-auth-guard.service';
import {AuthenticationService} from '../user/authentication.service';
import {RouterModule} from '@angular/router';
import {AdminDataService} from './admin-data.service';
import {MatTableModule} from '@angular/material';

const routes = [
  {
    path: 'beheerders',
    canActivate: [SuperAdminAuthGuard],
    component: AdminListComponent
  }
];

@NgModule({
  declarations: [AdminListComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AdminDataService,
    AuthenticationService,
    SuperAdminAuthGuard
  ]
})
export class SuperAdminModule {
}
