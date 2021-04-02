import { ListSubEquipmentComponent } from 'app/request-equipment/list-sub-equipment/list-sub-equipment.component';
import { AuthGuard } from './../../services/auth.guard';
import { ReadDetailFormComponent } from './../../leader/read-detail-form/read-detail-form.component';
import { CheckFormComponent } from './../../leader/check-form/check-form.component';
import { ManageUserComponent } from './../../admin/manage-user/manage-user.component';
import { ManageSubEquipmentComponent } from './../../request-equipment/manage-sub-equipment/manage-sub-equipment.component';
import { AddRequestEquipmentComponent } from './../../request-equipment/add-request-equipment/add-request-equipment.component';
import { RequestEquipmentComponent } from './../../request-equipment/request-equipment.component';
import { AllprojectComponent } from './../../allproject/allproject.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
// import { NewprojectComponent } from './../../newproject/newproject.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ReadProjectDetailComponent } from '../../users/read-project-detail/read-project-detail.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent},
    // { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'allproject',  component: AllprojectComponent },
    // { path: 'newproject',  component: NewprojectComponent },
    { path: 'requestEquipment',  component: RequestEquipmentComponent },
    { path: 'addRequestEquip',  component: AddRequestEquipmentComponent, canActivate: [AuthGuard] },
    { path: 'editRequestEquip/:equipmentId',  component: AddRequestEquipmentComponent, canActivate: [AuthGuard] },
    { path: 'manageSubQuipment/:listProjectId',  component: ManageSubEquipmentComponent },
    { path: 'manageUser',  component: ManageUserComponent },
    { path: 'readForm',  component: CheckFormComponent },
    { path: 'readDetailForm/:equipmentId',  component: ReadDetailFormComponent },
    { path: 'listSubEquipment', component: ListSubEquipmentComponent },
    { path: 'user-read-project/:id', component: ReadProjectDetailComponent }
];
