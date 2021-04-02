import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  NgForm,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Position {
  viewValue: string;
  value: string;
}

interface Department {
  viewValue: string;
  value: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 3;
  posite: Position[] = [
    { value: 'ครู', viewValue: 'ครู' },
    {
      value: 'หัวหน้ากลุ่มสาระการเรียนรู้',
      viewValue: 'หัวหน้ากลุ่มสาระการเรียนรู้',
    },
  ];

  departments: Department[] = [
    {
      value: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์',
      viewValue: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
      viewValue: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี',
      viewValue: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี',
    },
    { value: 'กลุ่มสาระการเรียนรู้ภาษาไทย', viewValue: 'กลุ่มสาระการเรียนรู้ภาษาไทย' },
    {
      value: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
      viewValue: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม',
      viewValue: 'กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้ศิลปะ',
      viewValue: 'กลุ่มสาระการเรียนรู้ศิลปะ',
    },
    {
      value: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
      viewValue: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
    },
  ];

  userRole: string;
  // formUserData: FormGroup;
  formUserData = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    position: ['', [Validators.required]],
    department: ['', [Validators.required]],
    role: [''],
    avatar: [''],
    permission: ['anvonymous'],
  });
  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private rout: Router,
    private usersServices: UsersService
  ) {}

  ngOnInit(): void {}

  userRegister() {
    if (this.formUserData.value.phone.length < 10) {
      window.alert('หมายเลขโทรศัพท์ไม่ครบ 10 หลัก');
    }
    if (this.formUserData.value.position == 'ครู') {
      // USER
      this.formUserData.value.role = 'USER';
      this.userRole = 'USER';
      const user = {
        data: this.formUserData.value,
      };
      this.usersServices.userSignup(
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
      console.log(this.formUserData.value.role );
    } else {
      // LEADER
      this.userRole = 'LEADER';
      this.formUserData.value.role  = 'LEADER';
      const user = {
        data: this.formUserData.value,
      };
      this.usersServices.userSignup(
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

      // Debug data
      console.log(user);
      console.log(this.formUserData.value);
      console.log(`Data from form register :${this.formUserData.value}`);
      console.log(this.formUserData.value.role );
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegisterComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
