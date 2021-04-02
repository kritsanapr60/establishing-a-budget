import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UsersService } from "app/services/users.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  // User detail
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  oldPassword: String;
  department: String;
  position: String;
  role: String;

  editPassword: FormGroup;
  // Password hide
  hide_old_pwd = true;
  hide_new_pwd = true;
  hide_confirm_pwd = true;

  error_messages = {
    ole_password: [
      { type: "required", message: "กรุณากรอกรหัวผ่านเดิม" },
      { type: "minlength", message: "รหัสผ่านต้องมี 8 ตัวขึ้นไป" },
      { type: "maxlength", message: "รหัสผ่านต้องไม่เกิน 30 ตัว" },
      // { type: 'required', message: 'please enter a valid Password.' }
    ],

    new_password: [
      { type: "required", message: "กรอกรหัวผ่านใหม่" },
      { type: "minlength", message: "รหัสผ่านต้องมี 8 ตัวขึ้นไป" },
      { type: "maxlength", message: "รหัสผ่านต้องไม่เกิน 30 ตัว" },
    ],
    confirm_password: [
      { type: "required", message: "ยังไม่กรอกข้อมูลการยืทยันรหัสผ่าน." },
      { type: "minlength", message: "รหัสผ่านต้องมี 8 ตัวขึ้นไป" },
      { type: "maxlength", message: "รหัสผ่านต้องไม่เกิน 30 ตัว" },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    private usersServices: UsersService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.editPassword = this.formBuilder.group(
      {
        old_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
        new_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
        confirm_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  get passwordInput() {
    return this.editPassword.get("password");
  }

  ngOnInit(): void {}

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("new_password");
    const { value: confirmPassword } = formGroup.get("confirm_password");
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  saveChangePassword() {
    const userID = this.usersServices.getUserId();
    this.usersServices.getUserDetail(userID).subscribe((result) => {
      const userData = result.data;
      this.firstName = result.data["lastName"];
      this.lastName = result.data["lastName"];
      this.email = result.data["email"];
      this.phone = result.data["phone"];
      this.oldPassword = result.data["password"];
      this.department = result.data["department"];
      this.position = result.data["position"];
      this.role = result.data["role"];

      Swal.fire({
        title: "ต้องการแก้ไขรหัสผ่านใช่หรือไม่ ?",
        text: "โปรดจำรหัสผ่านของคุณให้ดี !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.value) {
          console.log(this.editPassword.get("new_password"));
          this.usersServices.changePassword(
            userID,
            this.firstName,
            this.lastName,
            this.email,
            this.phone,
            this.editPassword.value.old_password,
            this.department,
            this.position,
            this.role,
            this.editPassword.value.new_password
          );
          this.dialogRef.close();
          Swal.fire(
            "สำเร็จ !",
            "คุณได้ทำการเปลี่ยนรหัสผ่านเรียบร้อยเเล้ว",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("ยกเลิก", "ยกเลิกการเปลี่ยนรหัสผ่าน", "error");
        }
      });
    });
    // console.log(this.editPassword.value.old_password);
    // console.log(this.editPassword.value.new_password);
    // console.log(this.editPassword.value.confirm_password);
  }
}
