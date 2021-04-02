import { AuthGuard } from './services/auth.guard';
import { ExportPDFComponent } from './allproject/export-pdf/export-pdf.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { AddRequestEquipmentComponent } from './request-equipment/add-request-equipment/add-request-equipment.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      },
    ],
    // canActivate: [AuthGuard],
  },
  {
    path: 'exportFile',
    component: ExportPDFComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'addRequestEquip',  component: AddRequestEquipmentComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
