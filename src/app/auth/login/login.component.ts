import { Subscription } from 'rxjs/Subscription';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
declare var $: any;
// export interface UserProfile {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
//   position: string;
//   role: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // email: string;
  // password: string;
  // login = new FormGroup ({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // })
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // userProfile: UserProfile[] = [
  //   {
  //     firstName: "Kritsana",
  //     lastName: "Prasit",
  //     email: "admin@gmail.com",
  //     password: "admin",
  //     phone: "0987654321",
  //     position: "admin",
  //     role: "admin",
  //   },
  //   {
  //     firstName: "Prasit",
  //     lastName: "Kritsana",
  //     email: "kritsana.pr.60@ubu.ac.th",
  //     password: "1234567890",
  //     phone: "0987654321",
  //     position: "user",
  //     role: "user",
  //   },
  // ];

  // login = this.fb.group({
  //   email: ["", Validators.required],
  //   password: ["", Validators.required],
  // });

  login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });
  hide = true;
  get emailInput() {
    return this.login.get('email');
  }
  get passwordInput() {
    return this.login.get('password');
  }

  // private authSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  status;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.autoAuthUser();
    this.status = this.usersService.getAuthStatusListener();
    console.log(this.status);
    if (this.status === true) {
      this.router.navigate(['/home']);
    }

    this.authStatusSub = this.usersService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
        console.log('Authentication type : ', typeof authStatus);
      });
  }

  onLogin() {
    this.usersService.userLogin(
      this.login.value.email,
      this.login.value.password
    );

    // const type = ['', 'info', 'success', 'warning', 'danger'];
    // const color = Math.floor(Math.random() * 4 + 1);

    // $.notify(
    //   {
    //     icon: 'notifications',
    //     message:
    //       `ยินดีต้อนรับคุณ <b>${this.login.value.email}</b> เข้าสู่ระบบ`,
    //   },
    //   {
    //     // type: type[color],
    //     type: type[2],
    //     timer: 2000,
    //     placement: {
    //       from: 'top',
    //       align: 'right',
    //     },
    //     template:
    //       '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
    //       '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
    //       '<i class="material-icons" data-notify="icon">notifications</i> ' +
    //       '<span data-notify="title">{1}</span> ' +
    //       '<span data-notify="message">{2}</span>' +
    //       '<div class="progress" data-notify="progressbar">' +
    //       '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    //       '</div>' +
    //       '<a href="{3}" target="{4}" data-notify="url"></a>' +
    //       '</div>',
    //   }
    // );

    // if (this.login.value) {
    //   if (
    //     this.login.value.email === this.userProfile[0]['email'] &&
    //     this.login.value.password === this.userProfile[0]['password']
    //   ) {
    //     this.router.navigate(['/home']);
    //     this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
    //       duration: 1000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //     });
    //   } else if (
    //     this.login.value.email === this.userProfile[1]['email'] &&
    //     this.login.value.password === this.userProfile[1]['password']
    //   ) {
    //     console.log(this.login.value.email, this.login.value.password);
    //     this.router.navigate(['/home']);
    //     this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
    //       duration: 1000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //     });
    //   } else {

    //     this._snackBar.open('Password or email invalid!!', 'ปิด', {
    //       duration: 50000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }
    // } else {
    //   window.alert(`${this.login.value}`);
    // }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
