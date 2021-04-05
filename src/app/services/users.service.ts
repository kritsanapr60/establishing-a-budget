import { Equipments } from './../../models/equipments.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, observable, ObservedValueOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// Model
import { AuthData } from './../../models/auth-data.model';
import { Users } from './../../models/users.model';

// RxJs lib
import { Subject } from 'rxjs';

import Swal from 'sweetalert2/dist/sweetalert2.js';

// import { first } from "rxjs/operators";
// import { UserData } from "../user-profile/user-profile.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangePasswordComponent } from '../user-profile/change-password/change-password.component';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + 'users/';
// const BACKEND_URL = 'https://budget-school-api.herokuapp.com/users/';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

  private userAll = new Subject<Users[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  userLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        // 'http://localhost:8080/users/authentication',
        BACKEND_URL + 'authentication',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            // console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/home']);

            this._snackBar.open('ยินดีต้อนรับ', 'ปิด', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    // console.log('autoAtuthUser : ', authInformation);
    if (!authInformation) {
      // console.log(`Don't have authInformation infunction : getAuthData`);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(`AuthoAutUser working now : ${now} , ${expiresIn}`);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } else {
      this.logout();
      this.router.navigate(['/']);
      // Swal.fire(
      //   "Session Expired;",
      //   "เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้งครับ",
      //   "info"
      // );
    }
  }

  private setAuthTimer(duration: number) {
    // console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
      // console.log('Now status you logout !');
    }, duration * 10000);
    // }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    // console.log('Save alredy daya of user : saveAuthData !');
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    // console.log('Clear Authentication data : clearAuthData');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    // console.log(
    //   `Token : ${token}, expireationDate : ${expirationDate}, userId : ${userId} `
    // );
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  userSignup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string,
    permission: string
  ) {
    const userDatail = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: null,
      permission: permission,
    };
    this.http
      // .post('http://localhost:8080/users/userRegister', userDatail)
      .post(BACKEND_URL + 'userRegister', userDatail)
      .subscribe(
        () => {
          // this.router.navigate(['/']);
          // Swal.fire(
          //   "เพิ่มผู้ใช้งานสำเร็จแล้ว",
          //   "You added user succesfully!",
          //   "success"
          // );
          this.router.navigate(['/']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  addUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string,
    permission: string
  ) {
    const userDatail = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: null,
      permission: permission,
    };
    this.http
      // .post('http://localhost:8080/users/userRegister', userDatail)
      .post(BACKEND_URL + 'userRegister', userDatail)
      .subscribe(
        () => {
          // this.router.navigate(['/']);
          Swal.fire(
            'เพิ่มผู้ใช้งานสำเร็จแล้ว',
            'You added user succesfully!',
            'success'
          );
        },
        (error) => {
          // this.authStatusListener.next(false);
        }
      );
  }

  getAllUsers() {
    return this.http.get<{ message: string; users: any }>(
      // 'http://localhost:8080/users/getAllUsers'
      BACKEND_URL + 'getAllUsers'
    );
  }

  updateUser() {
    return this.userAll.asObservable();
  }

  getUserAll() {
    return this.http
      .get<{ message: string; users: any }>(
        // 'http://localhost:8080/users/getAllUsers'
        BACKEND_URL + 'getAllUsers'
      )
      .subscribe((userAll) => {
        this.userAll.next([...userAll.users]);
      });
  }

  deleteUser(userId: string) {
    this.http
      // .delete('http://localhost:8080/users/deleteUser/' + userId)
      // .delete('http://localhost:8080/users/deleteUser/' + userId)
      .delete(BACKEND_URL + 'deleteUser/' + userId)
      .subscribe(
        (userDelete) => {
          // console.log(userDelete);
        },
        (error) => {
          // console.log(error);
        }
      );
  }

  editUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: string,
    permission: string
  ) {
    const user = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: avatar,
      permission: permission,
    };
    // console.log('User detail : ', user);

    // this.http
    //   .put(`${this.url_API}/users/verified/${id}`, user)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  getUserDetail(id: string) {
    // const userId = this.getUserId();
    // console.log(userId);
    return this.http.get<{ message: string; data: any }>(
      // 'http://localhost:8080/users/getOneUser/' + id
      BACKEND_URL + 'getOneUser/' + id
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    //  Swal.fire(
    //     'Session Expired;',
    //     'เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้งครับ',
    //     'info'
    //   );
  }

  // userEditData(
  //   id: string,
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   password: string,
  //   phone: string,
  //   position: string,
  //   department: string,
  //   role: string,
  //   avatar: File | string
  // ) {
  //   let userProfile = new FormData();
  //   if (typeof avatar === "object") {
  //     userProfile.append("_id", id);
  //     userProfile.append("firstName", firstName);
  //     userProfile.append("lastName", lastName);
  //     userProfile.append("email", email);
  //     userProfile.append("password", password);
  //     userProfile.append("phone", phone);
  //     userProfile.append("position", position);
  //     userProfile.append("department", department);
  //     userProfile.append("role", role);
  //     userProfile.append("avatar", avatar, id);
  //   } else {
  //     let userProfile: Users = {
  //       _id: id,
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       position: position,
  //       department: department,
  //       role: role,
  //       avatar: avatar,
  //       permission: null,
  //     };
  //   }

  //   console.log(userProfile);
  //   // const user = {
  //   //   _id: id,
  //   //   firstName: firstName,
  //   //   lastName: lastName,
  //   //   email: email,
  //   //   password: password,
  //   //   phone: phone,
  //   //   position: position,
  //   //   department: department,
  //   //   role: role,
  //   //   avatar: avatar,
  //   //   permission: null,
  //   // };
  //   // console.log(user);

  //   this.http
  //     .put<{ message: string; response: any }>(
  //       'http://localhost:8080/users/editProfile/' + id,
  //       userProfile
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         Swal.fire('แก้ไขข้อมูลเรียบร้อยแล้ว', 'You submitted succesfully!', 'success');
  //       },
  //       (error) => {
  //         console.log(error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'แก้ข้อมูลส่วนตัวไม่สำเร็จ!',
  //         })
  //       }
  //     );
  // }

  userEditProfile(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    position: string,
    department: string,
    role: string,
    avatar: File | string
  ) {
    const userProfile = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      position: position,
      department: department,
      role: role,
      avatar: avatar,
      permission: null,
    };
    this.http
      .put<{ message: string; response: any }>(
        // 'http://localhost:8080/users/userEditProfile/' + id,
         BACKEND_URL + 'userEditProfile/' + id,
        userProfile
      )
      .subscribe(
        (response) => {
          // console.log(response);
          Swal.fire(
            'แก้ไขข้อมูลเรียบร้อยแล้ว',
            'You submitted succesfully!',
            'success'
          );
        },
        (error) => {
          // console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'แก้ข้อมูลส่วนตัวไม่สำเร็จ!',
          });
        }
      );
  }

  adminEditUserData(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    position: string,
    department: string,
    role
  ) {
    const personalData = {
      id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      role
    };
    // console.log(personalData, 'with break point');

    this.http.put(BACKEND_URL + 'userEditProfile/' + id, personalData).subscribe(response => {
      // console.log('Edit user data success');
      Swal.fire(
        'แก้ไขข้อมูลเรียบร้อยแล้ว',
        'You submitted succesfully!',
        'success'
      );
    }, (error) => {
      // console.log('Edit data faild !');
      Swal.fire({
        icon: 'error',
        title: 'ขออภัยด้วยครับ',
        text: 'มีบางอย่างผิดพลาดโปรดลองใหม่ในภายหลัง !',
      });
    });
  }

  changePassword(
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    old_password: String,
    department: String,
    position: String,
    role: String,
    new_password: String
  ) {
    const userData = {
      id,
      firstName,
      lastName,
      email,
      phone,
      old_password,
      department,
      position,
      role,
      new_password,
    };
    // console.log(userData);

    this.http
      // .put('http://localhost:8080/users/' + 'editPassword/' + id, userData)
      .put(BACKEND_URL + 'editPassword/' + id, userData)
      .subscribe(
        (response) => {
          // console.log(`response is : ${response}`);
          Swal.fire('แก้ไขสำเร็จ', 'เปลี่ยนรหัสผ่านเรียบร้อย !', 'success');
        },
        (error) => {
          // console.log(`Error : ${error}`);
        }
      );
  }
}
