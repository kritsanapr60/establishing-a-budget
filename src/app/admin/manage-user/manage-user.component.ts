import { Subscription } from "rxjs/Subscription";
import { UserDetailComponent } from "./../user-detail/user-detail.component";

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from "rxjs/operators";
//  Import service user to use API
import { UsersService } from "./../../services/users.service";
import { Users } from "./../../../models/users.model";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AddUserComponent } from '../add-user/add-user.component';
interface SearchOption {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-manage-user",
  templateUrl: "./manage-user.component.html",
  styleUrls: ["./manage-user.component.css"],
})
export class ManageUserComponent implements OnInit, OnDestroy {
  @Output() passingData = new EventEmitter<object>();

  searchOption: SearchOption[] = [
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
    { value: "กลุ่มสาระการเรียนรู้ภาษาไทย", viewValue: "กลุ่มสาระการเรียนรู้ภาษาไทย" },
    {
      value: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
      viewValue: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
    },
    {
      value: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
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
  isLoading = false;
  users$;
  userData$;
  personalData;

  searchUser: string;
  selectedDepartment: string = "";
  userId: string;


  constructor(public dialog: MatDialog, private usersServices: UsersService) {}
  ngOnInit(): void {
    this.usersServices.getUserAll();
    this.usersServices.getAllUsers().subscribe((data) => {
      this.users$ = data.users;
      console.log(data);
    });

    this.userId = this.usersServices.getUserId();
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: "80%",
      // width: "90%",
      // data: {name: this.name, animal: this.animal}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDepartment = event.target.value;
    console.log(this.selectedDepartment);
  }
  userDetail(id) {
    // this.passingData.emit(id);
    // console.log(this.users$);
    this.personalData = this.users$.filter((data) => data._id === id);
    console.log(`Personal data : ${this.personalData}`);

    const dialogRef = this.dialog.open(UserDetailComponent, {
      // height: "80%",
      // width: "90%",
      data: {
        user: id,
      },
    });
    // dialogRef.afterClosed().subscribe(id => {
    //   console.log(`Dialog result: ${id}`);
    // });
    console.log(`Data id : ${id}`);
  }

  deleteUser(id: string) {
    Swal.fire({
      title: "คุณแน่ใจแล้วใช้ไหม ?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.value) {
        console.log("User id is : ", id);
        this.usersServices.deleteUser(id);
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
  ngOnDestroy(): void {
    // this.users$.unsubscripe();
  }
}
