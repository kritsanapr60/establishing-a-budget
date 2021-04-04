import { AuthInterceptor } from "./services/auth-interceptor";
// Module
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DndModule } from "ngx-drag-drop";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
// Component
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { ValidateEqualModule } from "ng-validate-equal";
import { ExportPDFComponent } from "./allproject/export-pdf/export-pdf.component";
// import { MoreDetailComponent } from './dashboard/more-detail/more-detail.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { IconsComponent } from './icons/icons.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { RequestEquipmentComponent } from './request-equipment/request-equipment.component';
// import { ManageProfileComponent } from './user-profile/manage-profile/manage-profile.component';
// import { ManageSubEquipmentComponent } from './request-equipment/manage-sub-equipment/manage-sub-equipment.component';
// import { ManageUserComponent } from './admin/manage-user/manage-user.component';
// import { CheckFormComponent } from './leader/check-form/check-form.component';
// import { ReadDetailFormComponent } from './leader/read-detail-form/read-detail-form.component';
// import { UserDetailComponent } from './admin/user-detail/user-detail.component';

// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { DetailHistoryComponent } from './allproject/detail-history/detail-history.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { AngularEditorModule } from '@kolkov/angular-editor';
// import { ListSubEquipmentComponent } from './request-equipment/list-sub-equipment/list-sub-equipment.component';
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_FORMATS,
} from "@angular/material-moment-adapter";
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MomentUtcDateAdapter } from "./moment-utc-date-adapter";
import { ErrorComponent } from "./error/error.component";
import { ErrorInterceptor } from "./services/error-interceptor";

// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
// import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';
// import { ReadNotificationComponent } from './notifications/read-notification/read-notification.component';
// import { ReadProjectDetailComponent } from './users/read-project-detail/read-project-detail.component';

// import { ManageEquipmentsComponent } from './admin/manage-equipments/manage-equipments.component';

// import { ThaiDatePipe } from './directives/thaidate.pipe';
import { CompareDirective } from "./directives/compare-password.directive";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    ValidateEqualModule,
    DragDropModule,
    DndModule,
    MatDialogModule,
    CKEditorModule,
    // SweetAlert2Module.forRoot(),
    // AngularEditorModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ExportPDFComponent,
    // MoreDetailComponent,
    ErrorComponent,
    CompareDirective,
  ],
  exports: [CompareDirective],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "th-TH" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
