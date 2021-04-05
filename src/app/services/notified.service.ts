import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Notification } from "./../../models/notified.model";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "notification/";
@Injectable({
  providedIn: "root",
})
export class NotifiedService {
  private notified: Notification[] = [];
  private notifiedUpdate = new Subject<Notification[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getAllNotified() {
    return this.http
      .get<{ message: string; notification; any }>(
        // 'http://localhost:8080/notification/getAllNotification'
        BACKEND_URL + "getAllNotification"
      )
      .subscribe((notified) => {
        this.notified = notified.notification;
        this.notifiedUpdate.next([...this.notified]);
      });
  }

  getNitifiedUpdateListener() {
    return this.notifiedUpdate.asObservable();
  }

  getNotified(id: string) {
    // console.log(id);
    return this.http.get<{ message: string; response; any }>(
      // 'http://localhost:8080/notification/getOneNotification/' + id
      BACKEND_URL + "getOneNotification/" + id
    );
  }

  // "type": "ครุภัณฑ์",
  // "status": "กำลังดำเนินการ",
  // "detail": "เอกสารโครงการของคุณกำลังอยู่ในระหว่างการดำเนินการ",
  // "note": "ไม่มีหมายเหตุ",
  addNotification(
    userId: string,
    type: string,
    status: string,
    detail: string,
    note: string
  ) {
    const notification = {
      id: null,
      type: type,
      status: status,
      detail: detail,
      note: note,
      userId: userId,
      readStatus: false,
    };

    this.http
      .post<{ message: string; notification: any }>(
        // "http://localhost:8080/notification/pushNotification",
        BACKEND_URL + "pushNotification",
        notification
      )
      .subscribe((respondata) => {
        // console.log(respondata);
      });
  }

  editNotification(
    id: string,
    userId: string,
    type: string,
    status: string,
    detail: string,
    note: string
  ) {
    const notification = {
      id: id,
      type: type,
      status: status,
      detail: detail,
      note: note,
      userId: userId,
      readStatus: true,
    };

    this.http
      .put(
        // "http://localhost:8080/notification/editNotification/" + id,
        BACKEND_URL + "editNotification/" + id,
        notification
      )
      .subscribe((response) => {
        this.router.navigate(["/notifications"]);
        // console.log("readed !");
      });
  }

  deleteNotified(id: string) {
    // console.log(id + "In Service file");
    this.http
      // .delete("http://localhost:8080/notification/deleteOneNotification/" + id)
      .delete(BACKEND_URL + "deleteOneNotification/" + id)
      .subscribe(() => {
        const updateDataNotified = this.notified.filter(
          (data) => data._id !== id
        );
        this.notified = updateDataNotified;
        this.notifiedUpdate.next([...this.notified]);
      });
  }
}
