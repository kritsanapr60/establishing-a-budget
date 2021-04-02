import { SubEquipmentsService } from './../../services/sub-equipments.service';
import { Equipments } from './../../../models/equipments.model';
import { EquipmentsService } from './../../services/equipments.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  equipments: Equipments[] = [];
  private getEquipmentsData: Subscription;
  successProject;
  pendingProject;
  rejectProject;
  userId: string;
  private allEquipment$: Subscription;
  document;
  idForCheck: any;
  // subServices: any;
  countDataInSubEquipment: Array<number> = [];

  dateDate = new Date(2021, 2, 10);
  userDepartment: any;
  separateDepartment: Equipments[];
  constructor(
    private userServices: UsersService,
    private equipmentServices: EquipmentsService,
    private subServices: SubEquipmentsService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    // Check data not success
    this.userId = this.userServices.getUserId();
    console.log('User ID :', this.userId);
    this.equipmentServices.getAllEquipments();
    this.allEquipment$ = this.equipmentServices
      .getEquipmentUpdateListener()
      .subscribe((equipments: Equipments[]) => {
        this.equipments = equipments;
        this.userServices.getUserDetail(this.userId).subscribe((result) => {
          this.userDepartment = result.data['department'];
          console.log('กลุ่ม :', this.userDepartment);
          this.separateDepartment = this.equipments.filter(
            (department) => department.learningGroups === this.userDepartment
          );
          // this.document = this.equipments.filter(
          //   (data) => data.creator === this.userId
          // );

          // Count sub equipment in for loop
          this.successProject = this.separateDepartment.filter(
            (data) => data.status === 'ผ่านการอนุมัติ'
          );

          this.pendingProject = this.separateDepartment.filter(
            (data) => data.status === 'กำลังดำเนินการ'
          );

          this.rejectProject = this.separateDepartment.filter(
            (data) => data.status === 'ไม่ผ่านการอนุมัติ'
          );

          for (let i = 0; i < this.pendingProject.length; i++) {
            console.log('Documents : ', this.pendingProject[i]['_id']);
            this.idForCheck = this.pendingProject[i]['_id'];
            this.subServices
              .getSubEquipment(this.idForCheck)
              .subscribe((value) => {
                console.log('Sub equipment : ', value.response);
                this.countDataInSubEquipment.push(value.response.length);
                // this.countDataInSubEquipment = value.response.length;
                console.log(
                  'Count sub equipment : ',
                  this.countDataInSubEquipment
                );
              });
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.allEquipment$.unsubscribe();
  }
}
