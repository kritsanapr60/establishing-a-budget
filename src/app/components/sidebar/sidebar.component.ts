import { Subscription } from "rxjs";
import { Users } from "./../../../models/users.model";
import { Observable } from "rxjs";
import { UserData } from "./../../user-profile/user-profile.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "./../../services/users.service";

import { Router } from "@angular/router";
import { NotifiedService } from "../../services/notified.service";
import { Notification } from "../../../models/notified.model";
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  badge: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    badge: "",
  },
  {
    path: "/allproject",
    title: "ประวัติการได้รับจัดสรร",
    icon: "content_paste",
    class: "",
    badge: "",
  },
  {
    path: "/requestEquipment",
    title: "เพิ่มคําขอครุภัณฑ์หลัก",
    icon: "library_books",
    class: "",
    badge: "",
  },
  {
    path: "/addRequestEquip",
    title: "เพิ่มคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/editRequestEquip/:equipmentId",
    title: "แก้ไขคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/manageSubQuipment/:listProjectId",
    title: "จัดการครุภัณฑ์หรือรายการย่อย",
    icon: "chrome_reader_mode",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/notifications",
    title: "การเเจ้งเตือนโครงการ",
    icon: "notifications",
    class: "",
    badge: "",
  },
  {
    path: "/user-profile",
    title: "โปรไฟล์",
    icon: "person",
    class: "",
    badge: "",
  },
  // {
  //   path: '/readForm',
  //   title: 'ตรวจสอบโครงการ',
  //   icon: 'folder_open',
  //   class: '',
  // },
  // {
  //   path: '/readDetailForm',
  //   title: 'อ่านรายละเอียดโครงการ',
  //   icon: 'chrome_reader_mode',
  //   class: '',
  // }, // ไม่แสดงใน Sidebar
  // {
  //   path: '/manageUser',
  //   title: 'จัดการผู้ใช้งาน',
  //   icon: 'supervised_user_circle',
  //   class: '',
  // },
];

export const ROUTES_LEADER: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    badge: "",
  },
  {
    path: "/allproject",
    title: "ประวัติการได้รับจัดสรร",
    icon: "content_paste",
    class: "",
    badge: "",
  },
  {
    path: "/requestEquipment",
    title: "เพิ่มคําขอครุภัณฑ์หลัก",
    icon: "library_books",
    class: "",
    badge: "",
  },
  {
    path: "/addRequestEquip",
    title: "เพิ่มคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/editRequestEquip/:equipmentId",
    title: "แก้ไขคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/manageSubQuipment/:listProjectId",
    title: "จัดการครุภัณฑ์หรือรายการย่อย",
    icon: "chrome_reader_mode",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/notifications",
    title: "การเเจ้งเตือนโครงการ",
    icon: "notifications",
    class: "",
    badge: "",
  },
  {
    path: "/user-profile",
    title: "โปรไฟล์",
    icon: "person",
    class: "",
    badge: "",
  },
  {
    path: "/readForm",
    title: "ตรวจสอบโครงการ",
    icon: "folder_open",
    class: "",
    badge: "",
  },
  {
    path: "/readDetailForm",
    title: "อ่านรายละเอียดโครงการ",
    icon: "chrome_reader_mode",
    class: "",
    badge: "",
  }, // ไม่แสดงใน Sidebar
  // {
  //   path: '/manageUser',
  //   title: 'จัดการผู้ใช้งาน',
  //   icon: 'supervised_user_circle',
  //   class: '',
  // },
];

export const ROUTES_ADMIN: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    badge: "",
  },
  {
    path: "/allproject",
    title: "ประวัติการได้รับจัดสรร",
    icon: "content_paste",
    class: "",
    badge: "",
  },
  {
    path: "/requestEquipment",
    title: "เพิ่มคําขอครุภัณฑ์หลัก",
    icon: "library_books",
    class: "",
    badge: "",
  },
  {
    path: "/addRequestEquip",
    title: "เพิ่มคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/editRequestEquip/:equipmentId",
    title: "แก้ไขคำขอจัดตั้งครุภัณฑ์ใหม่",
    icon: "library_books",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/manageSubQuipment/:listProjectId",
    title: "จัดการครุภัณฑ์หรือรายการย่อย",
    icon: "chrome_reader_mode",
    class: "",
    badge: "",
  }, // ไม่ได้อยู่ใน Sidebar
  {
    path: "/notifications",
    title: "การเเจ้งเตือนโครงการ",
    icon: "notifications",
    class: "",
    badge: "",
  },
  {
    path: "/user-profile",
    title: "โปรไฟล์",
    icon: "person",
    class: "",
    badge: "",
  },
  {
    path: "/readForm",
    title: "ตรวจสอบโครงการ",
    icon: "folder_open",
    class: "",
    badge: "",
  },
  {
    path: "/readDetailForm",
    title: "อ่านรายละเอียดโครงการ",
    icon: "chrome_reader_mode",
    class: "",
    badge: "",
  }, // ไม่แสดงใน Sidebar
  {
    path: "/manageUser",
    title: "จัดการผู้ใช้งาน",
    icon: "supervised_user_circle",
    class: "",
    badge: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userData$: Users;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  userData;
  userRole: string;

  notification: Notification[] = [];
  private allNotification: Subscription;
  closeDialig: boolean;
  userId: string;
  isLoading = false;
  private authStatusSub: Subscription;
  document;
  readStatus: any;
  countAlert: any;
  constructor(
    public usersService: UsersService,
    private notifiedService: NotifiedService
  ) {}

  ngOnInit() {
    // Personal data
    const userId = this.usersService.getUserId();
    this.usersService.getUserDetail(userId).subscribe((userData) => {
      // console.log(userData.data.role);
      this.userRole = userData.data.role;
      if (this.userRole === "USER") {
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
      }
      if (this.userRole === "LEADER") {
        this.menuItems = ROUTES_LEADER.filter((menuItem) => menuItem);
      }
      if (this.userRole === "ADMIN") {
        this.menuItems = ROUTES_ADMIN.filter((menuItem) => menuItem);
      }
    });

    // Authorizetion
    this.userIsAuthenticated = this.usersService.getIsAuth();
    this.authListenerSubs = this.usersService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.readNitification();
  }

  readNitification() {
    // Read notification
    this.userId = this.usersService.getUserId();
    this.notifiedService.getAllNotified();
    this.allNotification = this.notifiedService
      .getNitifiedUpdateListener()
      .subscribe((result: Notification[]) => {
        this.notification = result;
        this.document = this.notification.filter(
          (data) => data.creator === this.userId
        );
        const countAlert = this.document.filter(data => data.readStatus === false);
        this.countAlert = countAlert.length;
        // console.log('Count alert :', this.countAlert);
        // console.log(this.document.length);
        // for (let i = 0; i <= this.document.length; i++) {
        //   console.log('Count alert : ', this.document[i]['readStatus']);
        //   this.readStatus = this.document[i]['readStatus'];
        //   this.countAlert = 0;
        //   if (this.readStatus === false) {
        //     this.
        //   }
        // }
      });
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  onLogout() {
    this.usersService.logout();
  }

  OnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
