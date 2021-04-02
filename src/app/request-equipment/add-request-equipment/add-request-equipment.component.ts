import { Users } from './../../../models/users.model';
import { UsersService } from './../../services/users.service';
import { NotifiedService } from './../../services/notified.service';
import { EquipmentsService } from './../../services/equipments.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Equipments } from './../../../models/equipments.model';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subscription } from 'rxjs';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface Type {
  value: string;
  valueView: string;
}

@Component({
  selector: 'app-add-request-equipment',
  templateUrl: './add-request-equipment.component.html',
  styleUrls: ['./add-request-equipment.component.css'],
})
export class AddRequestEquipmentComponent implements OnInit, OnDestroy {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Initialized to specific date (09.10.2018).
  private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  typeOfProject: Type[] = [
    { value: 'ครุภัณฑ์การศึกษา', valueView: 'ครุภัณฑ์การศึกษา' },
    { value: 'โครงการ', valueView: 'โครงการ' },
  ];

  learningGroup: Type[] = [
    {
      value: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์',
      valueView: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
      valueView: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี',
      valueView: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
      valueView: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
      valueView: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม',
      valueView: 'กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้ศิลปะ',
      valueView: 'กลุ่มสาระการเรียนรู้ศิลปะ',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
      valueView: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
    },
  ];

  // Auto complete
  majorList = new FormControl();
  options: string[] = [
    'ครุภัณฑ์สำนักงาน',
    'ครุภัณฑ์การศึกษา',
    'ครุภัณฑ์ยานพาหนะและขนส฽่ง',
    'ครุภัณฑ์การเกษตร',
    'ครุภัณฑ์ก฽่อสร้฾าง',
    'ครุภัณฑ์ไฟฟ้าและวิทยุ',
    'ครุภัณฑ์โฆษณาและเผยแพร่',
    'ครุภัณฑ์วิทยาศาสตร์การแพทย์',
    'ครุภัณฑ์อาวุธ',
    'ครุภัณฑ์งานบ฾านงานครัว',
    'ครุภัณฑ์โรงงาน',
    'ครุภัณฑ์กีฬา',
    'ครุภัณฑ์สำรวจ',
    'ครุภัณฑ์ดนตรีและนาฏศิลป฼์',
    'ครุภัณฑ์คอมพิวเตอร์',
    'ครุภัณฑ์สนาม'
  ];
  filteredOptions: Observable<string[]>;

  equipments;
  private mode = 'create';
  private equipmentsId: string;
  dataEdit;

  equipmentsRequest: FormGroup;
  reasonPerson;
  equipmantsEdit;
  isLoading = false;
  private authStatusSub: Subscription;

  public Editor = ClassicEditor;
  // Data about user
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  private userDetail;
  constructor(
    public fb: FormBuilder,
    private equipmentsService: EquipmentsService,
    private notifiedService: NotifiedService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userServices: UsersService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.equipmentsRequest = new FormGroup({
      firstName: new FormControl(this.firstName, { validators: [] }),
      lastName: new FormControl(null, { validators: [] }),
      position: new FormControl(null, { validators: [] }),
      learningGroup: new FormControl(null, {
        validators: [],
      }),
      subjectTeach: new FormControl(null, {
        validators: [Validators.required],
      }),

      reason: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      objective: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),

      learningGroups: new FormControl(null, {
        validators: [Validators.required],
      }),
      majorList: new FormControl(null),
      budget: new FormControl(null, { validators: [Validators.required] }),

      necessary: new FormControl(null, { validators: [Validators.required] }),
      existEquipment: new FormControl(null, {
        validators: [Validators.required],
      }),
      otherReason: new FormControl(null, { validators: [Validators.required] }),
      dateProject: new FormControl(null, { validators: [Validators.required] }),
      condition: new FormControl(null, { validators: [Validators.required] }),
    });
    // Auto complete
    this.filteredOptions = this.majorList.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // Get user detail
    const userId = this.userServices.getUserId();
    console.log('User ID : ', userId);
    this.userServices.getUserDetail(userId).subscribe((userDetail) => {
      this.userDetail = userDetail.data;
      this.firstName = this.userDetail.firstName;
      this.lastName = this.userDetail.lastName;
      this.position = this.userDetail.position;
      this.department = this.userDetail.department;
      console.log(
        'User Detail',
        this.firstName,
        this.lastName,
        this.position,
        this.department
      );
    });
    this.route.paramMap.subscribe((paramMap) => {
      console.log('Param', paramMap.has('equipmentId'));
      if (paramMap.has('equipmentId')) {
        this.mode = 'edit';
        this.equipmentsId = paramMap.get('equipmentId');
        this.equipments = this.equipmentsService
          .getOneEquipment(this.equipmentsId)
          .subscribe((equipmentData) => {
            console.log(equipmentData);
            this.equipmantsEdit = {
              _id: equipmentData.response._id,
              firstName: equipmentData.response.firstName,
              lastName: equipmentData.response.lastName,
              position: equipmentData.response.position,
              learningGroup: equipmentData.response.learningGroup,
              subjectTeach: equipmentData.response.subjectTeach,
              reason: equipmentData.response.reason,
              objective: equipmentData.response.objective,
              typeEquipments: equipmentData.response.typeEquipments,
              learningGroups: equipmentData.response.learningGroups,
              majorList: equipmentData.response.majorList,
              budget: equipmentData.response.budget,
              necessary: equipmentData.response.necessary,
              existEquipment: equipmentData.response.existEquipment,
              otherReason: equipmentData.response.otherReason,
              dateProject: equipmentData.response.dateProject,
              condition: equipmentData.response.condition,
              status: equipmentData.response.status,
            };
            console.log(this.mode);
            console.log(this.equipmantsEdit);
            this.equipmentsRequest.setValue({
              firstName: this.equipmantsEdit.firstName,
              lastName: this.equipmantsEdit.lastName,
              position: this.equipmantsEdit.position,
              learningGroup: this.equipmantsEdit.learningGroup,
              subjectTeach: this.equipmantsEdit.subjectTeach,
              reason: this.equipmantsEdit.reason,
              objective: this.equipmantsEdit.objective,
              learningGroups: this.equipmantsEdit.learningGroups,
              majorList: this.equipmantsEdit.majorList,
              budget: this.equipmantsEdit.budget,
              necessary: this.equipmantsEdit.necessary,
              existEquipment: this.equipmantsEdit.existEquipment,
              otherReason: this.equipmantsEdit.otherReason,
              dateProject: this.equipmantsEdit.dateProject,
              condition: this.equipmantsEdit.condition,
            });
          });
      } else {
        this.mode = 'create';
        console.log(this.mode);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ckeditorContent;

  addData() {
    if (this.mode === 'create') {
      console.log('Form insert data : ', this.equipmentsRequest);
      this.equipmentsService.addEquipment(
        this.firstName,
        this.lastName,
        this.position,
        this.department,
        // this.equipmentsRequest.value.firstName,
        // this.equipmentsRequest.value.lastName,
        // this.equipmentsRequest.value.position,
        // this.equipmentsRequest.value.learningGroup,
        this.equipmentsRequest.value.subjectTeach,
        this.equipmentsRequest.value.reason,
        this.equipmentsRequest.value.objective,
        this.equipmentsRequest.value.typeEquipment,
        this.equipmentsRequest.value.learningGroups,
        this.equipmentsRequest.value.majorList,
        // this.majorList.value,
        this.equipmentsRequest.value.budget,
        this.equipmentsRequest.value.necessary,
        this.equipmentsRequest.value.existEquipment,
        this.equipmentsRequest.value.otherReason,
        this.equipmentsRequest.value.dateProject,
        this.equipmentsRequest.value.condition,
        '',
        ''
      );
      const type = 'โครงการ';
      const status = 'กำลังดำเนินการ';
      const detail = this.equipmentsRequest.value.majorList;
      const note = '';
      const userId = this.userServices.getUserId();
      // Notification
      this.notifiedService.addNotification(userId, type, status, detail, note);
      Swal.fire(
        'บันทึกรายการเรียบร้อย',
        'You submitted succesfully!',
        'success'
      );
      // this._snackBar.open('เพิ่มข้อมูลเรียบร้อย', 'ปิด', {
      //   duration: 5000,
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      // });
    } else {
      this.equipmentsService.editEquipment(
        this.equipmentsId,
        this.equipmentsRequest.value.firstName,
        this.equipmentsRequest.value.lastName,
        this.equipmentsRequest.value.position,
        this.equipmentsRequest.value.learningGroup,
        this.equipmentsRequest.value.subjectTeach,
        this.equipmentsRequest.value.reason,
        this.equipmentsRequest.value.objective,
        this.equipmentsRequest.value.typeEquipment,
        this.equipmentsRequest.value.learningGroups,
        this.equipmentsRequest.value.majorList,
        this.equipmentsRequest.value.budget,
        this.equipmentsRequest.value.necessary,
        this.equipmentsRequest.value.existEquipment,
        this.equipmentsRequest.value.otherReason,
        this.equipmentsRequest.value.dateProject,
        this.equipmentsRequest.value.condition,
        'กำลังดำเนินการ',
        '',
        ''
      );
      this.router.navigate(['/requestEquipment']);
      Swal.fire(
        'บันทึกรายการแก้ไขเรียบร้อย',
        'You submitted succesfully!',
        'success'
      );
      // this._snackBar.open('แก้ไขข้อมูลเรียบร้อย', 'ปิด', {
      //   duration: 5000,
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      // });
    }
  }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
