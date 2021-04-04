import { Component, OnInit } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroupDirective,
  NgForm,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "app/services/users.service";

interface Position {
  viewValue: string;
  value: string;
}

interface Department {
  viewValue: string;
  value: string;
}

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  posite: Position[] = [
    { value: "ครู", viewValue: "ครู" },
    {
      value: "หัวหน้ากลุ่มสาระการเรียนรู้",
      viewValue: "หัวหน้ากลุ่มสาระการเรียนรู้",
    },
    {
      value: "ผู้ดูแลระบบ",
      viewValue: "ผู้ดูแลระบบ",
    },
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

  userRole: string;
  // formUserData: FormGroup;
  formUserData = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    // confirm_password: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    position: ["", [Validators.required]],
    department: ["", [Validators.required]],
    role: [""],
    avatar: [""],
    permission: ["anvonymous"],
  });

  // Password hide
  hide = true;
  get passwordInput() {
    return this.formUserData.get("password");
  }
  constructor(
    public fb: FormBuilder,
    private rout: Router,
    private usersServices: UsersService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {}

  addUser() {
    if (this.formUserData.value.phone.length < 10) {
      window.alert("หมายเลขโทรศัพท์ไม่ครบ 10 หลัก");
    }
    if (this.formUserData.value.position == "ครู") {
      // USER
      this.formUserData.value.role = "USER";
      this.userRole = "USER";
      const user = {
        data: this.formUserData.value,
      };
      this.usersServices.addUser(
        this.formUserData.value.firstName,
        this.formUserData.value.lastName,
        this.formUserData.value.email,
        this.formUserData.value.password,
        this.formUserData.value.phone,
        this.formUserData.value.position,
        this.formUserData.value.department,
        // this.formUserData.value.role,
        this.userRole,
        this.formUserData.value.avatar,
        this.formUserData.value.permission
      );
      console.log(this.formUserData.value.role);
      this.closeDialog();
    } else if (this.formUserData.value.position == "ผู้ดูแลระบบ") {
      // ADMIN
      this.formUserData.value.role = "ADMIN";
      this.userRole = "ADMIN";
      const user = {
        data: this.formUserData.value,
      };
      this.usersServices.addUser(
        this.formUserData.value.firstName,
        this.formUserData.value.lastName,
        this.formUserData.value.email,
        this.formUserData.value.password,
        this.formUserData.value.phone,
        this.formUserData.value.position,
        this.formUserData.value.department,
        // this.formUserData.value.role,
        this.userRole,
        this.formUserData.value.avatar,
        this.formUserData.value.permission
      );
      console.log(this.formUserData.value.role);
      this.closeDialog();
    } else {
      // LEADER
      this.userRole = "LEADER";
      this.formUserData.value.role = "LEADER";
      const user = {
        data: this.formUserData.value,
      };
      this.usersServices.addUser(
        this.formUserData.value.firstName,
        this.formUserData.value.lastName,
        this.formUserData.value.email,
        this.formUserData.value.password,
        this.formUserData.value.phone,
        this.formUserData.value.position,
        this.formUserData.value.department,
        // this.formUserData.value.role,
        this.userRole,
        this.formUserData.value.avatar,
        this.formUserData.value.permission
      );
      this.closeDialog();

      // Debug data
      console.log(user);
      console.log(this.formUserData.value);
      console.log(`Data from form register :${this.formUserData.value}`);
      console.log(this.formUserData.value.role);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
