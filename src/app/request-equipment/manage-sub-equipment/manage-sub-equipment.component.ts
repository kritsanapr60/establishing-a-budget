import { ListSubEquipmentsService } from './../../services/list-sub-equipments.service';
import { SubEquipments } from './../../../models/sub-equipments.model';
import { SubEquipmentsService } from './../../services/sub-equipments.service';
import { UsersService } from './../../services/users.service';
import { Equipments } from './../../../models/equipments.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { EquipmentsService } from './../../services/equipments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from './../request-equipment.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map, startWith } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { ConstantPool } from '@angular/compiler';

declare var $: any;
@Component({
  selector: 'app-manage-sub-equipment',
  templateUrl: './manage-sub-equipment.component.html',
  styleUrls: ['./manage-sub-equipment.component.css'],
})
export class ManageSubEquipmentComponent implements OnInit, OnDestroy {
  subEquipment: FormGroup;
  socket;
  // listOfProject = [
  //   {
  //     no: '1',
  //     type: 'โครงการ',
  //     list: 'วงโยธวาทิต',
  //     unit: '20',
  //     budget: 900000,
  //     subEquipment: 900000,
  //   },
  // ];

  majorList: string;
  budget: number;
  necessary: number;
  majorId: string;

  totalBudget: number;
  isLoading = false;
  projectId: string;
  totalUnitPerprice: number;
  countUnit: number;
  countPricePerUnit: number;
  private authStatusSub: Subscription;
  private allUpdate: Subscription;
  subEquipmentsData: SubEquipments[] = [];

  valueOfprice: number;
  valueOfunit: number;

  // Auto complete
  equipmentName = new FormControl();
  educations: string[] = [
    'โต๊ะนักเรียน',
    'เครื่องเขียนตัวอักษร',
    'กระดานไวท์บอร์ด(สำหรับห้฾องเรียน)',
    'ทีวีสำหรับการเรียนการสอน',
    'จักรเย็บผ฾้า',
    'ครุภัณฑ์สำหรับการทดลองในห้฾องปฏิบัติการ',
  ];
  office: string[] = [
    'เครื่องโทรศัพท์',
    'เครื่องถ฽ายเอกสาร',
    'เครื่องอัดสำเนา',
    'เครื่องเจาะกระดาษและเข้฾าเ่ล฽ม ',
    'เครื่องนับธนบัตร',
    'พัดลม',
    'พัดลมระบายอากาศ',
    'ลิฟท์',
    'เครื่องขัดพื้น',
    'แท฽่นวาง/อ฽่านหนังสือพิมพ์',
    'กระดานไวท์บอร์ด(ในสำนักงาน)',
    'เครื่องพิมพ์ดีด',
    'เครื่องโทรสาร',
    'เครื่องพิมพ์สำเนาระบบดิจิตอล',
    'เครื่องทำลายเอกสาร',
    'เครื่องบันทึกเงินสด',
    'เครื่องปรับอากาศ',
    'เครื่องฟอกอากาศ',
    'เครื่องปรุกระดาษไข',
    'ถังเก็บน้า',
    'รถเข็นเอกสาร',
    'โต๊ะ',
    'เก้฾าอี้',
    'ตู฾้ ',
  ];

  transport: string[] = [
    'รถยนต์ (รถยนต์นั่ง รถยนต์โดยสาร)',
    'รถจักรยานยนต์',
    'รถจักรยาน',
    'รถบรรทุก (รถบรรทุกน้า น้ามัน ขยะ)',
    'แม่เเรงยกอากาศยาน',
    'รถไฟฟ้า',
    'เรือ (เรือยนต์ เรือบด เรือติดท฾าย เรือเร็ว เรือพ฽วง)',
  ];

  agricutrul: string[] = [
    'ปศุสัตว์ เช฽่น ช฾้าง ม฾า วัว ควาย',
    'เครื่องพ฽นยา',
    'เครื่องตัดวัชพืช',
    'เครื่องยกร฽่อง',
    'เครื่องผสมยาคลุกเมล็ดพันธุ์',
    'เครื่องรดน้า',
    'เครื่องสีฝัด',
    'เครื่องคราดหญ้฾า',
    'เครื่องสูบน้า',
    'เครื่องชั่งน้าหนักสำหรับการเกษตร - ตู฾้เก็บเมล็ดพันธ์',
    'เครื่องผสมยาคลุกเมล็ดพันธุ์',
    'เครื่องรดน้า',
  ];
  construction: string[] = [
    'เครื่องกระทุ฾้งดิน',
    'สว฽านเจาะแผ่฽นเหล็ก',
    'เครื่องพ฽่นสี',
    'เครื่องผสมคอนกรีต',
    'เครื่องสั่นคอนกรีต',
    'เครื่องมือทดลองความลาดเท - เครื่องโม฽หิน',
    'เครื่องตีเส฾้นเครื่องกลึง',
    'เครื่องอัดลม',
    'เครื่องเชื่อมโลหะ',
    'เครื่องเจาะเหล็ก',
    'เครื่องมือไสไม้฾ไฟฟ้า',
    'เครื่องผสมยางแอสฟัลท์',
    'เครื่องตบดิน',
    'เครื่องมือทดลองคอนกรีต',
    'เครื่องอัดจารบี',
    'เครื่องตอกเข็ม',
    'เครื่องตัดกระเบื้อง',
    'เครื่องเจาะหิน',
    'เลื่อยไฟฟ้า',
  ];

  electrical: string[] = [
    'เครื่องกาเนิดไฟฟ้า',
    'เครื่องขยายเสียง',
    'เครื่องเล฽่นแผ฽่นเสียง',
    'เครื่องวัดความถี่คลื่นวิทยุ - เครื่องถอดเทป',
    'วิทยุ',
    'เทป',
    'หม฾อแปลงไฟฟ้า',
    'เครื่องบันทึกเสียง',
    'เครื่องรับส่฽งวิทยุ',
    'เครื่องอัดสำเนาเทป ',
    'เครื่องเล่฽นซีดี',
  ];

  distribute: string[] = [
    'เครื่องอัดและขยายภาพ',
    'เครื่องล฾้างฟิล์ม',
    'เครื่องเทปซิงโครไนต์',
    'จอรับภาพ',
    'เครื่องวิดีโอ',
    'เครื่องมัลติมีเดียโปรเจคเตอร์',
    'โทรทัศน์',
    'เครื่องตัดต฽่อภาพ',
    'เครื่องวีดีโอ',
    'โครมไฟถ่ายภาพและวีดีโอ',
    'กล฾อง เช่฽น กล฾องถ฽ายรูป กล฾องถ฽ายภาพยนตร์ กล฾องถ฽ายวิดีโอ เป็นต฾น',
    'เครื่องฉาย (เครื่องฉายภาพยนตร์ เครื่องฉายสไลด์ เครื่องฉายภาพทึบแสง เครื่องฉายภาพข฾ามศีรษะ)',
  ];
  science: string[] = [
    'กล้฾องจุลทรรศน์ กล฾้องดูดาว',
    'เครื่องดูดเสมหะ ',
    'เครื่องดูดเลือด/หนอง',
    'หม฾อต฾มเครื่องมือไฟฟูา',
    'ยูนิตทาฟัน',
    'เครื่องช่฽วยความสว่฽างของกล้฾องจุลทรรศน์ ',
    'เครื่องดูดอากาศ',
    'เครื่องมือเทียบสีเคมี',
    'เครื่องจ฽ายแก๊สคลอรีน',
    'เครื่องมือเติมน้ายา',
    'เครื่องจี้จมูก ',
    'เครื่องจี้คอ',
    'เครื่องเจาะกระดูก ',
    'เครื่องเจาะไข',
    'ตู฾้อบเด็ก',
    'ตู฾้ส฽องดูฟิล์มเอ็กซเรย์',
    'เครื่องชั่งน้ำหนัก (สำหรับคน)',
    'เครื่องทดสอบความถ่฽วงจำเพาะของของเหลว',
    'เครื่องลอกลวดลายจากภาพถ่฽าย',
    'เครื่องตรวจสอบมาตรไฟฟ้า',
    'เครื่องมือทดลองหาลิควิดลิมิท',
  ];
  weapon: string[] = [
    'ปืน',
    'ปืนพก',
    'ปืนลูกซอง',
    'กระบอง/อุปกรณ์ออกกาลังกายทุกชนิด',
  ];
  housework: string[] = [
    'เครื่องกรองน้า',
    'ตู้฾เย็น ',
    'ตู้฾แช่฽อาหาร',
    'เครื่องซักผ฾า',
    'เครื่องดูดควัน ',
    'ตู฾ทาน้าแข็ง',
    'เครื่องอบผ฾้า',
    'เครื่องอัดลมขับด้฾วยเครื่องยนต์ ',
    'เครื่องทดสอบแสงสว฽่าง',
    'เครื่องตรวจสอบคุณภาพน้ำ',
    'เครื่องระเหยของเหลว',
    'เครื่องวิเคราะห์แยกขนาดของเม็ดดิน ',
    'โซเดียมแลมพ์',
    'เครื่องตักตะกอน',
    'เครื่องอบแอมโมเนีย',
    'เครื่องเอ็กซเรย์',
    'เครื่องล฾้างฟิล์มเอกซเรย์',
    'เครื่องช฽่วยหายใจ',
    'เครื่องล้฾างเข็มฉีดยา',
    'เครื่องมือช่฽วยคลอด',
    'เครื่องมือสาหรับบดอาหารของเชื้อแบคทีเรีย',
    'เครื่องล้฾างชาม ',
    'เตาอบเตาแก๊ส',
    'ผ฾้าม่฽านพร้฾อมอุปกรณ์',
    'เครื่องทำน้ำเย็น ',
    'เตียง(เช่฽น เตียงไม฾เตียงเหล็ก) ',
    'เครื่องดูดฝุุ่น',
  ];

  factory: string[] = [
    'เครื่องพิมพ์ลายบนแก้ว',
    'แท่นพิมพ์',
    'เครื่องพิมพ์แบบ',
    'เครื่องทำเหรียญกษาปณ์',
    'เครื่องตีตราและอัดแบบ',
    'เครื่องปั๊มตราดุน',
    'เครื่องเขียนโลหะด้วยไฟฟ้า',
    'เครื่องเชื่อมโลหะ',
    'เครื่องชุบผิวโลหะ',
    'เตาเคลือบโลหะ เตาหลอมโลหะ',
    'เตาอบ',
    'ตู้อบเครื่องรัก',
    'เครื่องเจียระไน',
    'เครื่องทอผ้า',
    'เครื่องดัดโลหะ',
    'เครื่องปั๊มและตัดโลหะ',
    'เครื่องตัดเหล็ก',
    'เครื่องพับและม้วนเหล็ก',
    'เครื่องจักรกล',
    'เครื่องจักรไอน้ำ',
    'เครื่องล้างทำความสะอาดเครื่องยนต์',
    'เครื่องตรวจสอบหัวฉีดเครื่องยนต์',
    'เครื่องอัดฉีอเครื่องจักร',
    'เครื่องมือถอดสปริงลิ้น',
    'เครื่องสำหรับดูดบู๊ชและลูกปืน',
    'เครื่องตรวจทุ่นไดนาโม',
    'เครื่องดูดลม',
    'แท่นกลึง',
    'เครื่องคว้าน',
    'เครื่องทำเกลียว',
    'เครื่องทำเฟือง',
    'เครื่องดูดเฟือง',
    'เครื่องถอดและต่อโซ่',
    'เครื่องปรับความถี่และกำลังดัน',
    'ทั่งระดับเหล็ก',
    'เครื่องกลั่น',
    'เครื่องกว้าน',
    'เครื่องโม่หิน',
    'เครื่องย่อยหิน',
    'เครื่องอัดจารบี',
    'เครื่องปั๊มน้ำมันไฟฟ้า',
    'เครื่องหยอดน้ำมัน',
    'มอเตอร์หินเจีย',
    'เครื่องเจีย',
    'เครื่องขัดกระดาษทราย',
    'เครื่องลอกบัว',
    'เครื่องเป่าลม',
    'เครื่องมือต่าง ๆ เช่น เลื่อยวงเดือนไฟฟ้า เลื่อยฉลุไฟฟ้า ไขควงไฟฟ้า กบไฟฟ้า สว่านไฟฟ้า เป็นต้น  ',
  ];
  sport: string[] = [
    'แทรมโปลีน',
    'บ๊อกซ์สแตนส์',
    'โต๊ะเทเบิลเทนนิส',
    'จักรยานออกกำลังกาย',
    'เหล็กยกน้ำหนัก',
    'บาร์คู่',
    'บาร์ต่างระดับ',
    'ม้าหู',
    'ม้าขวาง',
  ];

  explore: string[] = [
    'กล้องส่องทางไกล',
    'เครื่องเจาะสำรวจ',
    'กล้องระดับ',
    'กล้องวัดมุม',
    'โซ่ลาน',
    'ไม้สตาฟฟ์',
  ];
  music: string[] = [
    'ปี่คาลิเน็ท',
    'แตรทรัมเป็ท',
    'แตรทรัมโบน',
    'แตรบาริโทน',
    'แตรยูฟอร์เนียม',
    'แตรบาสซูน',
    'แซกโซโฟน',
    'ไวโอลีน',
    'วิโอล่า',
    'เซลโล่',
    'เบส',
    'เปียโน',
    'ออร์แกนไฟฟ้า',
    'ระนาด',
    'ฆ้องวง',
    'ขิม',
    'ศีรษะโขนละคร',
    'เครื่องแต่งกายชุดแสดงโขน – ละคร',
  ];
  computor: string[] = [
    'มอนิเตอร์',
    'เครื่องพิมพ์',
    'พล็อตเตอร์',
    'เครื่องแปลงรหัสสัญญาณ',
    'เครื่องถ่ายทอดสัญญาณจากคอมพิวเตอร์ขึ้นจอภาพ',
    'เครื่องปรับระดับกระแสไฟ',
    'สแกนเนอร์',
    'ดิจิไทเซอร์',
    'เครื่องสำรองกระแสไฟฟ้า',
    'เครื่องแยกกระดาษ',
    'เครื่องป้อนกระดาษ',
    'เครื่องอ่านข้อมูล',
    'เครื่องอ่านและบันทึกข้อมูล',
    'โปรแกรมคอมพิวเตอร์ หรือซอฟแวร์ที่มีราคาหน่วยหนึ่ง หรือชุดหนึ่งเกินกว่า 20,000 บาท',
  ];

  field: string[] = ['เต๊นท์สนาม', 'เข็มทิศ', 'ถุงนอน', 'เปล', 'เตียงสนาม'];

  filteredOptions: Observable<string[]>;
  educationsList: string[] = [];
  main: Array<any> = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mainEquipmentServices: EquipmentsService,
    private userServices: UsersService,
    private subServices: SubEquipmentsService,
    private listSub: ListSubEquipmentsService
  ) {
    // this.socket = io();
  }

  ngOnInit(): void {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.subEquipment = new FormGroup({
      equipmentName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      pricePerunit: new FormControl(null, {
        validators: [Validators.required],
      }),
      unit: new FormControl(null, { validators: [Validators.required] }),
      // budget: new FormControl(null, { validators: [Validators.required] }),
    });

    this.subEquipment.get('pricePerunit').valueChanges.subscribe((value) => {
      this.valueOfprice = value;
    });
    this.subEquipment.get('unit').valueChanges.subscribe((value) => {
      this.valueOfunit = value;
    });
    // this.totalUnitPerprice = this.valueOfprice * this.valueOfunit;

    // console.log(this.totalUnitPerprice);
    this.route.paramMap.subscribe((paramMap) => {
      this.projectId = paramMap.get('listProjectId');
      console.log('ProjectId :', this.projectId);
      this.mainEquipmentServices
        .getOneEquipment(this.projectId)
        .subscribe((listProject) => {
          console.log('Debug', listProject);
          this.majorId = listProject.response._id;
          this.majorList = listProject.response.majorList;
          this.budget = listProject.response.budget;
          this.necessary = listProject.response.necessary;
          // console.log(this.equipmentDetail);

          // Auto complete
          this.filteredOptions = this.equipmentName.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value, this.majorList))
          );
          // update listen
          // this.subServices.getAllSubEquipments();
          // this.allUpdate = this.subServices
          //   .subEquipmentListenUpdate()
          //   .subscribe((dataUpdate: SubEquipments[]) => {
          //     this.subEquipmentsData = dataUpdate;
          //     console.log('Data listen : ', dataUpdate);
          //   });

          // Get data
          this.sumPrice(this.majorId);
          // this.totalBudget = 0;
          // this.subServices.getEquipmentBySubId(listProject.response._id);
          // console.log(this.subServices);
          // this.allUpdate = this.subServices
          //   .subEquipmentListenUpdate()
          //   .subscribe((data: SubEquipments[]) => {
          //     this.subEquipmentsData = data;
        });
    });
  }

  /**
   * Auto complete of sub equipments
   *
   * @private
   * @param {string} value
   * @returns {string[]}
   * @memberof ManageSubEquipmentComponent
   */
  private _filter(value: string, mainName: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('mainName', mainName);
    this.mainEquipmentServices
      .getOneEquipment(this.projectId)
      .subscribe((result) => {
        this.main.push(result.response.majorList);
        // this.main = result.response.majorList;
        console.log('This is main', this.main.toString());
        return this.main.toString();
      });
    console.log('This is main outsite', this.main);
    if (mainName == 'ครุภัณฑ์การศึกษา') {
      return this.educations.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์สำนักงาน') {
      return this.office.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์ยานพาหนะและขนส฽่ง') {
      return this.transport.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์การเกษตร') {
      return this.agricutrul.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์ก฽่อสร้฾าง') {
      return this.construction.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์ไฟฟ้าและวิทยุ') {
      return this.electrical.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์โฆษณาและเผยแพร่') {
      return this.distribute.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์อาวุธ') {
      return this.weapon.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์งานบ฾านงานครัว') {
      return this.housework.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์โรงงาน') {
      return this.factory.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์กีฬา') {
      return this.sport.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์สำรวจ') {
      return this.explore.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์ดนตรีและนาฏศิลป฼์') {
      return this.music.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์คอมพิวเตอร์') {
      return this.computor.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    } else if (mainName == 'ครุภัณฑ์สนาม') {
      return this.field.filter(
        (option) => option.toLowerCase().indexOf(filterValue) === 0
      );
    }


  }

  sumPrice(majorId) {
    this.totalBudget = 0;
    this.subServices.getEquipmentBySubId(majorId);
    // console.log(this.subServices);
    this.allUpdate = this.subServices
      .subEquipmentListenUpdate()
      .subscribe((data: SubEquipments[]) => {
        this.subEquipmentsData = data;

        // นับราคารวม
        for (let i = 0; i < this.subEquipmentsData.length; i++) {
          console.log('ราคาแต่ละหน่วย :', this.subEquipmentsData[i]['budget']);
          // this.totalBudget += this.subEquipmentsData[i]["budget"];
          this.totalBudget =
            this.totalBudget + this.subEquipmentsData[i]['budget'];
        }
        console.log('ราคารวม : ', this.totalBudget);
      });
  }

  addSubEupqment() {
    this.totalBudget = this.totalBudget - this.totalBudget;
    this.totalUnitPerprice =
      this.subEquipment.value.pricePerunit * this.subEquipment.value.unit;
    if (this.totalUnitPerprice > this.budget) {
      console.log(this.totalBudget);
      Swal.fire('ราคาครุภัณฑ์รองเกินราคาที่ตั้งไว้ !');
    } else {
      // this.totalBudget += this.totalUnitPerprice;
      this.subServices.addSubEquipments(
        this.majorId,
        this.majorList,
        this.subEquipment.value.equipmentName,
        this.subEquipment.value.pricePerunit,
        this.subEquipment.value.unit,
        this.totalUnitPerprice
      );
      this.subServices.getEquipmentBySubId(this.projectId);

      // Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
      const type = ['', 'info', 'success', 'warning', 'danger'];
      const color = Math.floor(Math.random() * 4 + 1);

      $.notify(
        {
          icon: 'notifications',
          message: `เพิ่มข้อมูล <b>${this.subEquipment.value.equipmentName}</b> เรียบร้อย`,
        },
        {
          type: type[2],
          timer: 2000,
          placement: {
            from: 'top',
            align: 'right',
          },
          template:
            '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>',
        }
      );
      this.subEquipment.reset();
    }
  }

  deleteEquipment(id: any, price: number) {
    this.totalBudget = this.totalBudget - this.totalBudget;

    // this.totalBudget = this.totalBudget - price;
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.subServices.deleteSubEquipment(id);
        Swal.fire(
          'ลบรายการสำเร็จ',
          'ลบรายการครุภัณฑ์ย่อยเรียบร้อย!',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('ยกเลิกการลบรายการ', '', 'warning');
      }
    });
    console.log(id);
  }
  saveSubEupqment() {
    // console.log(this.listOfSubProject);
  }
  daleteEquip() {
    window.confirm('ต้องการลบข้อมูลนี้หรือไม่');
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.allUpdate.unsubscribe();
  }
}
