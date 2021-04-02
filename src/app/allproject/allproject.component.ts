import { FormsModule } from "@angular/forms";
import { DetailHistoryComponent } from "./detail-history/detail-history.component";
import { Component, OnInit, Inject } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "app/services/users.service";
import { Subscription } from "rxjs";
import { Equipments } from "models/equipments.model";
import { EquipmentsService } from "app/services/equipments.service";
import { data } from "jquery";
import { EquipmentsHistoryService } from "../services/equipments-history.service";

interface SearchOption {
  value: string;
  valueView: string;
}

@Component({
  selector: "app-allproject",
  templateUrl: "./allproject.component.html",
  styleUrls: ["./allproject.component.css"],
})
export class AllprojectComponent implements OnInit {
  searchOption: SearchOption[] = [
    { value: "ครุภัณฑ์สำนักงาน", valueView: "ครุภัณฑ์สำนักงาน" },
    { value: "ครุภัณฑ์การศึกษา", valueView: "ครุภัณฑ์การศึกษา" },
    {
      value: "ครุภัณฑ์ยานพาหนะและขนส่฽ง",
      valueView: "ครุภัณฑ์ยานพาหนะและขนส่฽ง",
    },
    { value: "ครุภัณฑ์การเกษตร", valueView: "ครุภัณฑ์การเกษตร" },
    { value: "ครุภัณฑ์ก่฽อสร้฾าง", valueView: "ครุภัณฑ์ก่฽อสร้฾าง" },
    { value: "ครุภัณฑ์ไฟฟ้าและวิทยุ", valueView: "ครุภัณฑ์ไฟฟ้าและวิทยุ" },
    {
      value: "ครุภัณฑ์โฆษณาและเผยแพร่฽",
      valueView: "ครุภัณฑ์โฆษณาและเผยแพร่฽",
    },
    {
      value: "ครุภัณฑ์วิทยาศาสตร์การแพทย์",
      valueView: "ครุภัณฑ์วิทยาศาสตร์การแพทย์",
    },
    { value: "ครุภัณฑ์อาวุธ", valueView: "ครุภัณฑ์อาวุธ" },
    { value: "ครุภัณฑ์งานบ฾้านงานครัว", valueView: "ครุภัณฑ์งานบ฾้านงานครัว" },
    { value: "ครุภัณฑ์โรงงาน", valueView: "ครุภัณฑ์โรงงาน" },
    { value: "ครุภัณฑ์กีฬา", valueView: "ครุภัณฑ์กีฬา" },
    { value: "ครุภัณฑ์สำรวจ", valueView: "ครุภัณฑ์สำรวจ" },
    {
      value: "ครุภัณฑ์ดนตรีและนาฏศิลป์฼",
      valueView: "ครุภัณฑ์ดนตรีและนาฏศิลป์฼",
    },
    { value: "ครุภัณฑ์คอมพิวเตอร์", valueView: "ครุภัณฑ์คอมพิวเตอร์" },
    { value: "ครุภัณฑ์สนาม", valueView: "ครุภัณฑ์สนาม" },
  ];

  selectOption: string;

  isLoading = false;
  private authStatusSub: Subscription;

  equipments: Equipments[] = [];
  private getEquipmentsData: Subscription;
  dataDetail;
  userId: string;
  history;

  searchEquipment: string;
  constructor(
    public dialog: MatDialog,
    private userServices: UsersService,
    private equipmentServices: EquipmentsService,
    private histories: EquipmentsHistoryService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    // Get data totable
    this.userId = this.userServices.getUserId();
    this.histories.getHistory().subscribe((result) => {
      this.equipments = result.response;
      console.log("result :", this.equipments);
      console.log("Creator :", this.equipments['creator']);
      console.log("USerId :", this.userId);

      this.history = this.equipments.filter(
        (data) => data.creator === this.userId
      );
      console.log('Filter :', this.history);
    });

    // this.equipmentServices.getAllEquipments();
    // this.getEquipmentsData = this.equipmentServices
    //   .getEquipmentUpdateListener()
    //   .subscribe((objectData: Equipments[]) => {
    //     this.equipments = objectData;
    //     console.log("History : ", this.equipments);
    //     this.history = this.equipments.filter(
    //       (data) => data.creator === this.userId
    //     );
    //     // console.log('Creator Id:', this.equipments.filter(data => data.creator === this.userId));
    //   });
  }

  openDialog(id: string) {
    this.dataDetail = this.equipments.filter((data) => data._id === id);
    const dialogRef = this.dialog.open(DetailHistoryComponent, {
      width: '80%',
      data: {
        detail: this.dataDetail,
        id: id,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  onChange(newValue) {
    console.log(newValue);
    this.selectOption = newValue;
    // ... do other stuff here ...
  }
}
