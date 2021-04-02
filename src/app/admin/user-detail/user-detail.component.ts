import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Users } from "./../../../models/users.model";
import { UsersService } from "./../../services/users.service";

interface Position {
  viewValue: string;
  value: string;
}

interface Department {
  viewValue: string;
  value: string;
}

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  // userData = [
  //   {
  //     id: 2,
  //     firstName: "Prasit",
  //     lastName: "Kritsana",
  //     email: "kritsana.pr.60@ubu.ac.th",
  //     password: "1234567890",
  //     phone: "0987654321",
  //     position: "user",
  //     role: "user",
  //     permission: "Anonymous",
  //   },
  // ];

  posite: Position[] = [
    { value: "ครู", viewValue: "ครู" },
    {
      value: "หัวหน้ากลุ่มสาระการเรียนรู้",
      viewValue: "หัวหน้ากลุ่มสาระการเรียนรู้",
    },
    { value: "ผู้ดูแลระบบ", viewValue: "ผู้ดูแลระบบ" },
  ];

  departments: Department[] = [
    {
      value: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
      viewValue: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
    },
    { value: "กลุ่มสาระการเรียนรู้", viewValue: "กลุ่มสาระการเรียนรู้ภาษาไทย" },
    {
      value: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
      viewValue: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
    },
    {
      value: "กลุ่มสาระการเรียนรู้",
      viewValue: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ศิลปะ",
      viewValue: "กลุ่มสาระการเรียนรู้ศิลปะ",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
      viewValue: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
    },
  ];

  // formUserData: FormGroup;
  formUserData = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    position: ["", [Validators.required]],
    department: ["", [Validators.required]],
    role: ["user"],
    avatar: [""],
    permission: ["anonymous"],
  });

  userprofile: FormGroup;

  dataUser;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: string;
  avatar: any;
  permission: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: string },
    public dialog: MatDialog,
    public fb: FormBuilder,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userprofile = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      position: new FormControl(""),
      department: new FormControl(""),
    });

    const userID = this.usersService.getUserId();
    console.log(userID);
    this.usersService.getUserDetail(this.data.user).subscribe((userDetail) => {
      console.log(userDetail);
      this.firstName = userDetail.data.firstName;
      this.lastName = userDetail.data.lastName;
      this.email = userDetail.data.email;
      this.phone = userDetail.data.phone;
      this.position = userDetail.data.position;
      this.department = userDetail.data.department;
      this.avatar = userDetail.data.avatar;
      this.permission = userDetail.data.permission;

      this.userprofile.setValue({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        position: this.position,
        department: this.department,
      });
    });
    console.log("User Profile : ", this.userprofile.value);

    this.dataUser = this.data.user;
    console.log(`User ID in dialog component: ${this.data.user}`);
  }

  ondeleteUser(id, userName) {
    const valueConfirm = window.confirm(
      `ต้องการลบผู้ใช้งาน ${id} ${userName} คนนี้หรือไม่ ?`
    );
    console.log(valueConfirm);
    this.dialog.closeAll();
  }

  // editUser() {
  //   console.log(this.formUserData.value);
  //   window.alert(this.formUserData.value);
  // }

  editUser() {
    if (this.userprofile.value.position === "ผู้ดูแลระบบ") {
      this.role = "ADMIN";
    } else if (
      this.userprofile.value.position === "หัวหน้ากลุ่มสาระการเรียนรู้"
    ) {
      this.role = "LEADER";
    } else {
      this.role = "USER";
    }
    console.log(this.userprofile.value);
    this.usersService.adminEditUserData(
      this.data.user,
      this.userprofile.value.firstName,
      this.userprofile.value.lastName,
      this.userprofile.value.email,
      this.userprofile.value.phone,
      this.userprofile.value.position,
      this.userprofile.value.department,
      this.role
    );
  }
}
