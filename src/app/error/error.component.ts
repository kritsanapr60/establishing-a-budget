import { Component, OnInit, Inject } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
// data: { message: string };
  // private errorSub: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, status: string }) {
    Swal.fire({
      icon: 'error',
      title: this.data.message,
      text: this.data.status
    });
  }
  // constructor(private errorService: ErrorService) {}

  // ngOnInit() {
  //   this.errorSub = this.errorService.getErrorListener().subscribe(message => {
  //     this.data = { message: message };
  //   });
  // }

  // onHandleError() {
  //   this.errorService.handleError();
  // }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
