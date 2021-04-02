import { ErrorService } from './error.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ErrorComponent } from './../error/error.component';

  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog, private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred!';
          // let errorStatus = 'เข้าสู่ระบบไม่สำเร็จ';
          if (error.error.message && error.error.status) {
            errorMessage = error.error.message;
            // errorStatus = error.error.status;
          }
          // this.dialog.open(ErrorComponent, {data: {message: errorMessage, status: errorStatus}});
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: error.error.status,
          });
          // this.errorService.throwError(errorMessage);
          return throwError(error);
        })
      );
    }
  }