import { NotifiedService } from "./../../services/notified.service";
import { SubEquipments } from "./../../../models/sub-equipments.model";
import { SubEquipmentsService } from "./../../services/sub-equipments.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EquipmentsService } from "./../../services/equipments.service";
import { Equipments } from "./../../../models/equipments.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "app/services/users.service";
import { Subscription } from "rxjs";
import { param } from "jquery";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { EquipmentsHistoryService } from "../../services/equipments-history.service";
@Component({
  selector: "app-read-detail-form",
  templateUrl: "./read-detail-form.component.html",
  styleUrls: ["./read-detail-form.component.css"],
})
export class ReadDetailFormComponent implements OnInit, OnDestroy {
  // listOfProject = [
  //   {
  //     no: "1",
  //     type: "โครงการ",
  //     list: "วงโยธวาทิต",
  //     unit: "20",
  //     budget: 900000,
  //     subEquipment: 900000,
  //   },
  // ];

  dataDetail;
  isLoading = false;
  private authStatusSub: Subscription;

  budget;
  number;
  condition: string;
  dateProject;
  existEquipment;
  firstName: string;
  lastName: string;
  learningGroup: string;
  learningGroups: string;
  majorList: string;
  necessary: number;
  objective;
  otherReason;
  position;
  reason;
  status: string;
  subjectTeach: string;
  listSubEquipments: Array<any> = [];

  conditionValue: FormGroup;
  // personalData
  userId;
  fetchFirstName;
  fetchLastName;
  fetchEmail;
  fetchPhone;
  fetchPosition;
  fetchAvatar;

  equipmentId: string;
  subequipment_group: Subscription;
  subEquipmentList: SubEquipments[] = [];

  formApprove: FormGroup;
  typeEquipment: string;
  idUserInProject: any;
  role: any;
  list_sub_equipments: Subscription;
  constructor(
    private userServices: UsersService,
    private router: ActivatedRoute,
    private route: Router,
    private equipmentService: EquipmentsService,
    private subServices: SubEquipmentsService,
    private notifiedService: NotifiedService,
    private histories: EquipmentsHistoryService
  ) {}

  ngOnInit(): void {
    this.formApprove = new FormGroup({
      approveCondition: new FormControl(null, {
        validators: [Validators.required],
      }),
      approveReason: new FormControl(null, {
        validators: [Validators.required, Validators.min(5)],
      }),
    });
    this.conditionValue = new FormGroup({
      condition: new FormControl(null, { validators: [] }),
    });
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    // Section user detail
    const userId = this.userServices.getUserId();
    this.userServices.getUserDetail(userId).subscribe((data) => {
      this.fetchFirstName = data.data.firstName;
      this.fetchLastName = data.data.lastName;
      this.role = data.data.role;
      // console.log(this.fetchFirstName + " " + this.fetchLastName);
    });

    // Section fetch data of Project | Equipment
    this.router.paramMap.subscribe((paramMap) => {
      const equipmentId = paramMap.get("equipmentId");
      this.equipmentService.getOneEquipment(equipmentId).subscribe((data) => {
        this.equipmentId = data.response._id;
        this.dataDetail = data.response;
        this.budget = data.response.budget;
        this.condition = data.response.condition;
        this.dateProject = data.response.dateProject;
        this.existEquipment = data.response.existEquipment;
        this.firstName = data.response.firstName;
        this.lastName = data.response.lastName;
        this.learningGroup = data.response.learningGroup;
        this.learningGroups = data.response.learningGroups;
        this.majorList = data.response.majorList;
        this.necessary = data.response.necessary;
        this.objective = data.response.objective;
        this.otherReason = data.response.otherReason;
        this.position = data.response.position;
        this.reason = data.response.reason;
        this.status = data.response.status;
        this.subjectTeach = data.response.subjectTeach;
        this.idUserInProject = data.response.userId;
        // console.log(this.dataDetail);
        // Get list of sub equipment
        this.subServices.getEquipmentBySubId(this.equipmentId);
        this.list_sub_equipments = this.subServices.subEquipmentListenUpdate().subscribe((data: SubEquipments[]) => {
          const list_sub_equipments = data;
          console.log(list_sub_equipments.length);
          for (let i = 0; i < list_sub_equipments.length; i++) {
            this.listSubEquipments.push(list_sub_equipments[i]);
            // console.log(list_sub_equipments[i]);
          }
          // console.log('list of sub equipment : ', this.listSubEquipments);
          // console.log('Type of :', typeof this.listSubEquipments);
        })

        this.conditionValue.setValue({
          condition: this.condition,
        });
        // this.subServices.getEquipmentBySubId(this.equipmentId);
        this.subequipment_group = this.subServices
          .subEquipmentListenUpdate()
          .subscribe((value: SubEquipments[]) => {
            this.subEquipmentList = value;
            // console.log("Sub Equipment : ", this.subEquipmentList);
          });
        // console.log(this.dataDetail);
      });
    });
  }

  approveProject() {
    Swal.fire({
      title: "คุณต้องการอนุมัติโครงการนี้ ?",
      text: "หากอนุมัติโครงการแล้วจะไม่สามารถเปลี่ยนหรือแก้ไขข้อมูลได้ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.formApprove.value.approveCondition === "อนุมัติเห็นชอบโครงการนี้"
        ) {
          this.status = "ผ่านการอนุมัติ";
        } else {
          this.status = "ไม่ผ่านการอนุมัติ";
        }

        // Check Status for add history
        const userId = this.userServices.getUserId();
        if (this.status === "ผ่านการอนุมัติ") {
          this.histories.addHistory(
            this.equipmentId,
            this.firstName,
            this.lastName,
            this.position,
            this.learningGroup,
            this.subjectTeach,
            this.reason,
            this.objective,
            this.typeEquipment,
            this.learningGroups,
            this.majorList,
            this.budget,
            this.necessary,
            this.existEquipment,
            this.otherReason,
            this.dateProject,
            this.condition,
            this.status,
            this.formApprove.value.approveCondition,
            this.formApprove.value.approveReason,
            this.idUserInProject,
            this.listSubEquipments
          );
        }

        this.equipmentService.editEquipment(
          this.equipmentId,
          this.firstName,
          this.lastName,
          this.position,
          this.learningGroup,
          this.subjectTeach,
          this.reason,
          this.objective,
          this.typeEquipment,
          this.learningGroups,
          this.majorList,
          this.budget,
          this.necessary,
          this.existEquipment,
          this.otherReason,
          this.dateProject,
          this.condition,
          this.status,
          this.formApprove.value.approveCondition,
          this.formApprove.value.approveReason
        );

        const type = this.formApprove.value.approveCondition;
        const note = this.formApprove.value.approveReason;
        // const note = " ";
        // const type = " ";
        const status = this.status;
        const detail = this.majorList;
        // Notification
      this.notifiedService.addNotification(this.idUserInProject, type, status, detail, note);

        this.route.navigate(["/readForm"]);
        Swal.fire(
          "อนุมัติโครงการสำเร็จ",
          "You submitted succesfully!",
          "success"
        );
      } else if (result.isDismissed) {
      }
    });
  }

  ngOnDestroy() {
    this.subequipment_group.unsubscribe();
  }
}
