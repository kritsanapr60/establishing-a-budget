import { Component, OnInit, Inject } from "@angular/core";
import { NotifiedService } from "app/services/notified.service";
import { UsersService } from "app/services/users.service";
import { Subscription } from "rxjs";
import { Notification } from "../../../models/notified.model";
import { Users } from "../../../models/users.model";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Type } from "../../request-equipment/request-equipment.component";

@Component({
  selector: "app-read-notification",
  templateUrl: "./read-notification.component.html",
  styleUrls: ["./read-notification.component.css"],
})
export class ReadNotificationComponent implements OnInit {
  notification: Notification[] = [];
  private allNotification: Subscription;
  closeDialig: boolean;
  userId: string;
  isLoading = false;
  private authStatusSub: Subscription;
  document;
  firstName: any;
  lastName: any;

  detail: string;
  status: string;
  note: string;
  dateTime: string;
  readDtatus: boolean;
  type: string;
  constructor(
    public notifiedService: NotifiedService,
    private userServices: UsersService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id }
  ) {}

  ngOnInit() {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.userId = this.userServices.getUserId();
    this.userServices.getUserDetail(this.userId).subscribe((userData) => {
      this.firstName = userData.data.firstName;
      this.lastName = userData.data.lastName;
    });
    const id = this.data.toString();
    console.log(id);
    this.notifiedService.getNotified(id).subscribe((result) => {
      this.document = result.response;
      this.detail = this.document['detail'];
      this.status= this.document['status'];
      this.note = this.document['note'];
      this.dateTime = this.document['dateTime'];
      this.readDtatus =  this.document['readStatus'];
      this.type = this.document['type'];
    });
    // this.notifiedService.getAllNotified();
    // this.allNotification = this.notifiedService
    //   .getNitifiedUpdateListener()
    //   .subscribe((result: Notification[]) => {
    //     this.notification = result;
    //     this.document = this.notification.filter(
    //       (data) => data.creator === this.userId
    //     );
    //     console.log(this.document);
    //   });
  }
}
