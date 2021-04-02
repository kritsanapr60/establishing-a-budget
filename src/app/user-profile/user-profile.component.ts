import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { ManageProfileComponent } from "app/user-profile/manage-profile/manage-profile.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { UsersService } from "./../services/users.service";
import { mimeType } from "./mime-type.validator";
import { ChangePasswordComponent } from "./change-password/change-password.component";
interface Position {
  viewValue: string;
  value: string;
}

interface Department {
  viewValue: string;
  value: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  position: string;
}

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // userData: UserData[] = [
  //   {
  //     firstName: "กฤษณะ",
  //     lastName: "ประสิทธิ์",
  //     email: "kritsana.pr.60@ubu.ac.th",
  //     phone: "09876543221",
  //     gender: "ชาย",
  //     age: "22",
  //     position: "ผู้ดูแลระบบ",
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

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private userId;

  /**
   *  ตัวแปลที่รับค่าข้อมูลจาก Database ที่ Subscrip มา
   *
   * @memberof UserProfileComponent
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  avatar: string;
  department: string;
  role: string;
  /**
   * Form Group for read and edit user datea
   *
   * @type {FormGroup}
   * @memberof UserProfileComponent
   */
  profile: FormGroup;
  editPassword: FormGroup;
  imagePreview: string;
  noImagePath: string = "../assets/img/faces/no-image.png";

  constructor(public dialog: MatDialog, private userServices: UsersService) {}

  ngOnInit() {
    // Section user detail
    this.profile = new FormGroup({
      firstName: new FormControl(this.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(this.lastName, {
        validators: [Validators.required],
      }),
      email: new FormControl(this.email, { validators: [Validators.required] }),
      password: new FormControl(this.password, {
        validators: [Validators.required],
      }),
      phone: new FormControl(this.phone, { validators: [Validators.required] }),
      position: new FormControl(this.position, {
        validators: [Validators.required],
      }),
      department: new FormControl(this.department, {
        validators: [Validators.required],
      }),
      avatar: new FormControl(this.avatar, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
   
    // Section user
    this.userServices.autoAuthUser();
    this.userId = this.userServices.getUserId();
    console.log(this.userId);
    this.userServices.getUserDetail(this.userId).subscribe((oneUserDetail) => {
      console.log(`Personal data : ${oneUserDetail.data.toString()}`);
      this.id = oneUserDetail.data._id;
      this.firstName = oneUserDetail.data.firstName;
      this.lastName = oneUserDetail.data.lastName;
      this.email = oneUserDetail.data.email;
      this.password = oneUserDetail.data.password;
      this.phone = oneUserDetail.data.phone;
      this.position = oneUserDetail.data.position;
      (this.avatar = oneUserDetail.data.avatar),
        (this.department = oneUserDetail.data.department),
        (this.role = oneUserDetail.data.role),
        console.log(this.avatar);
      this.imagePreview = this.avatar;

      // Set data value in profile form control
      this.profile.setValue({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        position: this.position,
        department: this.department,
        avatar: this.avatar,
      });
    });
    if (
      (this.avatar != "ADMIN", this.avatar != "USER", this.avatar != "LEADER")
    ) {
      this.imagePreview = "../assets/img/faces/no-image.png";
    }

    this.userIsAuthenticated = this.userServices.getIsAuth();
    this.authListenerSubs = this.userServices
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profile.patchValue({ avatar: file });
    this.profile.get("avatar").updateValueAndValidity();
    console.log(file);
    console.log(this.profile);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // editUser() {
  //   if (this.profile.invalid) {
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(ManageProfileComponent);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  onSavePost() {
    // console.log(
    //   this.userId,
    //   this.profile.value.firstName,
    //   this.profile.value.lastName,
    //   this.profile.value.email,
    //   this.profile.value.password,
    //   this.profile.value.phone,
    //   this.profile.value.position,
    //   this.profile.value.department,
    //   this.role,
    //   this.profile.value.avatar
    // );

    // this.userServices.userEditData(
    //   this.userId,
    //   this.profile.value.firstName,
    //   this.profile.value.lastName,
    //   this.profile.value.email,
    //   this.profile.value.password,
    //   this.profile.value.phone,
    //   this.profile.value.position,
    //   this.profile.value.department,
    //   this.role,
    //   this.profile.value.avatar
    // );

    this.userServices.userEditProfile(
      this.userId,
      this.profile.value.firstName,
      this.profile.value.lastName,
      this.profile.value.email,
      this.profile.value.password,
      this.profile.value.phone,
      this.profile.value.position,
      this.profile.value.department,
      this.role,
      this.profile.value.avatar
    );
  }

  changePassword() {
    const change_PW_Ref = this.dialog.open(ChangePasswordComponent, {
      width: '60%'
    });
    change_PW_Ref.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result[0]}`);
      // const response = result.value;
    });
  }

  ngOnDestroy(): void {
    // this.authListenerSubs.unsubscribe();
  }
}
