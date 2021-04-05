import { Injectable } from '@angular/core';
// Export PDF
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { UsersService } from 'app/services/users.service';
import { EquipmentsService } from 'app/services/equipments.service';
import { SubEquipmentsService } from './sub-equipments.service';
import { EquipmentsHistoryService } from './equipments-history.service';
import { Equipments } from 'models/equipments.model';
import { SubEquipments } from '../../models/sub-equipments.model';
import { map } from 'rxjs/operators';
import THBText from 'thai-baht-text'
@Injectable({
  providedIn: 'root',
})
export class ExportsEquipmentService {
  equipments: any;
  userId: string;
  userData: any;
  // Equipment data
  equipment_id: string;
  majorList: string;
  objective: string;
  reason: string;

  approveCondition: string;
  approveReason: string;
  budget: number;
  condition: string;
  dateProject: Date;
  existEquipment: string;
  learningGroup: string;
  learningGroups: string;
  necessary: number;
  otherReason: string;
  subjectTeach: string;

  // Sub Equipments
  set_sub_Equipment: Array<any> = [];
  sub_budget: number;
  budgetPerPrice: number;
  equipmentName: string;
  mainId: string;
  mainName: string;
  unit: number;

  // Personal data
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  phone: string;
  position: string;
  role: string;
  sub_equipments: SubEquipments[] = [];
  leader: any;

  constructor(
    private _usersServices: UsersService,
    private _equipmentsServices: EquipmentsService,
    private _subEquipmentsServices: SubEquipmentsService,
    private _historiesServices: EquipmentsHistoryService
  ) {}

  userDetail() {
    this.userId = this._usersServices.getUserId();
    this._usersServices.getUserDetail(this.userId).subscribe((result) => {
      this.userData = result.data;
      console.log(this.userData);
      return this.userData;
    });
  }

  generatePdf(id) {
    // Config PDF
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    };

    this._equipmentsServices.getOneEquipment(id).subscribe((equipments) => {
      this.equipments = equipments.response;
      console.log('Export equipment :', this.equipments);
      this.firstName = this.equipments.firstName;
      this.lastName = this.equipments.lastName;
      this.subjectTeach = this.equipments.subjectTeach;
      this.department = this.equipments.learningGroup;
      this.equipment_id = this.equipments._id;
      this.reason = this.equipments.reason;
      this.objective = this.equipments.objective;
      this.majorList = this.equipments.majorList;
      this.budget = this.equipments.budget;
      this.necessary = this.equipments.necessary;
      this.existEquipment = this.equipments.existEquipment;
      this.condition = this.equipments.condition;


      this._usersServices.getAllUsers().subscribe(leader => {
        const get_leader = leader.users;
        this.leader = get_leader.filter(user => user['position'] === 'หัวหน้ากลุ่มสาระการเรียนรู้' &&
         user['department'] === this.department);
        console.log(this.leader);
      this._subEquipmentsServices
        .getSubEquipment(this.equipment_id)
        .subscribe((response) => {
          this.sub_equipments = response.response;
          console.log(this.sub_equipments);

          // Table
          this.sub_equipments.forEach((element) => {
            // const content = [`${element.equipmentName}`, `${element.budgetPerPrice}`, `${element.unit}`, `${element.budget}`];
            // this.set_sub_Equipment.push();
            console.log(element.equipmentName);
            console.log(element.budgetPerPrice);
            console.log(element.unit);
            console.log(element.budget);
          });

          var column = [];
          column.push({
            text: 'รายการครุภัณฑ์ย่อย',
            style: 'tableHeader',
            fontSize: 16,
            bold: true,
            alignment: 'center',
          });
          column.push({
            text: 'ราคาต่อหน่วย',
            style: 'tableHeader',
            fontSize: 16,
            bold: true,
            alignment: 'center',
          });
          column.push({
            text: 'จำนวนหน่วย',
            style: 'tableHeader',
            fontSize: 16,
            bold: true,
            alignment: 'center',
          });
          column.push({
            text: 'ราคารวม',
            style: 'tableHeader',
            fontSize: 16,
            bold: true,
            alignment: 'center',
          });

          var headerContent = [
            {
              text: 'ลำดับ',
              style: 'tableHeader',
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
            {
              text: 'รายการครุภัณฑ์ย่อย',
              style: 'tableHeader',
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
            {
              text: 'ราคาต่อหน่วย',
              style: 'tableHeader',
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
            {
              text: 'จำนวนหน่วย',
              style: 'tableHeader',
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
            {
              text: 'ราคารวม',
              style: 'tableHeader',
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
          ];

           // ได้ 2 เเถวแต้ข้อมูลต่อเกัน
           var row_all = [];
           for (let i = 0; i < this.sub_equipments.length; i++) {
             var value = [];
             var row = []
             for (let j = 0; j < this.sub_equipments.length; j++) {
               value.push({
                 text: this.sub_equipments[i].equipmentName,
                 style: 'tableHeader',
               });
               value.push({
                 text: this.sub_equipments[i].budgetPerPrice,
                 style: 'tableHeader',
                 alignment: 'center',
               });
               value.push({
                 text: this.sub_equipments[i].unit,
                 style: 'tableHeader',
                 alignment: 'center',
               });
               value.push({
                 text: this.sub_equipments[i].budget,
                 style: 'tableHeader',
                 alignment: 'center',
               });
             }
             row_all.push(value);
             row_all = [];
           }

          // ได้เฉพาะแถวเดียว
          // var wantedBody = ['Col1 Row', 'Col2 Row', 'Col3 Row', 'Col4 Row'];
          var tableBody = [];
          for (var i = 0; i < headerContent.length; i++) {
            var row = [];
            for (var j = 0; j < this.sub_equipments.length; j++) {
              row.push({
                text: this.sub_equipments[j].equipmentName,
                style: 'tableHeader',
              });
              row.push({
                text: this.sub_equipments[j].budgetPerPrice,
                style: 'tableHeader',
                alignment: 'center',
              });
              row.push({
                text: this.sub_equipments[j].unit,
                style: 'tableHeader',
                alignment: 'center',
              });
              row.push({
                text: this.sub_equipments[j].budget,
                style: 'tableHeader',
                alignment: 'center',
              });
            }
            tableBody.push(row);
            row = [];
            console.log(tableBody);
          }

          const dd = {
            header: {},
            footer(currentPage, pageCount) {
              return {
                columns: [
                  {
                    text: 'โครงการจัดตั้งครุภัณฑ์',
                    fontSize: 14,
                    alignment: 'center',
                  },
                  {
                    text:
                      'หน้าที่ ' +
                      currentPage.toString() +
                      ' จาก ' +
                      pageCount +
                      'หน้า',
                    margin: [5, 5, 15, 5],
                    alignment: 'right',
                  },
                ],
              };
            },

            content: [
              {
                text: 'โครงการจัดตั้งครุภัณฑ์',
                fontSize: 18,
                alignment: 'center',
                bold: true,
              },
              ' ',
              {
                columns: [
                  {
                    width: '20%',
                    text: 'ชื่อโครงการ',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: 'ครุภัณฑ์คอมพิวเตอร์',
                    fontSize: 16,
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: '20%',
                    text: 'กลุ่มงานที่รับผิดชอบ',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `${this.department}`,
                    fontSize: 16,
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: '20%',
                    text: 'ผู้รับผิดชอบ',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `${this.firstName}  ${this.lastName}`,
                    fontSize: 16,
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: '20%',
                    text: 'รายวิชาที่สอน',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `${this.subjectTeach}`,
                    fontSize: 16,
                  },
                ],
                columnGap: 10,
              },
              {
                columns: [''],
                columnGap: 20,
              },
              ' ',
              {
                text: '1. ที่มาและเหตุผล',
                fontSize: 16,
                bold: true,
              },
              {
                text: `${this.reason}`,
                fontSize: 16,
                alignment: 'justify'
              },
              ' ',
              {
                text: '2. วัตถุประสงค์',
                fontSize: 16,
                bold: true,
              },
              {
                text: `${this.objective}`,
                fontSize: 16,
                alignment: 'justify'
              },
              ' ',
              {
                text: '3. ข้อมูลครุภัณฑ์',
                fontSize: 16,
                bold: true,
              },
              {
                columns: [
                  {
                    width: '10%',
                    text: '     ',
                  },
                  {
                    width: '25%',
                    text: 'ครุภัณฑ์หลัก',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `: ${this.majorList}`,
                    fontSize: 16,
                  },
                ],
              },
              {
                columns: [
                  {
                    width: '10%',
                    text: '     ',
                  },
                  {
                    width: '25%',
                    text: 'จำนวนงบประมาณที่จัดตั้ง',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `: ${this.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}   ${THBText(this.budget)} `,
                    fontSize: 16,
                  },
                ],
              },
              {
                columns: [
                  {
                    width: '10%',
                    text: '     ',
                  },
                  {
                    width: '25%',
                    text: 'เกณฑ์ความจำเป็นที่ต้องมี',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `: ${this.necessary}  หน่วย`,
                    fontSize: 16,
                  },
                ],
              },
              {
                columns: [
                  {
                    width: '10%',
                    text: '     ',
                  },
                  {
                    width: '25%',
                    text: 'อุปกรณ์ที่มีอยู่แล้ว',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `: ${this.existEquipment}  หน่วย`,
                    fontSize: 16,
                  },
                ],
              },
              {
                columns: [
                  {
                    width: '10%',
                    text: '     ',
                  },
                  {
                    width: '25%',
                    text: 'เงื่อนไขการขอ',
                    fontSize: 16,
                    bold: true,
                  },
                  {
                    width: '*',
                    text: `: ${this.condition}`,
                    fontSize: 16,
                  },
                ],
              },
              ' ',
              {
                text: '4. รายการครุภัณฑ์',
                fontSize: 16,
                bold: true,
              },

              {
                // layout: 'lightHorizontalLines', // optional
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', '*', '*', '*'],
                  body:
                  // [headerContent, tableBody],
                  // [column, value],
                  [headerContent, ...this.sub_equipments.map((data, index) => {
                    // tslint:disable-next-line: no-unused-expression
                    return [
                      { text: index + 1 , alignment: 'center', fontSize: 16},
                      { text: data.equipmentName, fontSize: 16},
                      { text: data.budgetPerPrice, alignment: 'center', fontSize: 16},
                      { text: data.unit, alignment: 'center', fontSize: 16},
                      { text: data.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), alignment: 'center', fontSize: 16}
                    ]
                    })]
                },
              },
              ' ',
              ' ',
              ' ',
              ' ',
              {
                width: '*',
                text: `ลงชื่อ........................................................ผู้เสนอโครงการ`,
                fontSize: 16,
                alignment: 'center'
              },
              {
                width: '*',
                text: `(${this.firstName}  ${this.lastName})`,
                fontSize: 16,
                alignment: 'center'
              },
              ' ',
              ' ',
              {
                width: '*',
                text: `ลงชื่อ........................................................หัวหน้ากลุ่มสาระการเรียนรู้`,
                fontSize: 16,
                alignment: 'center'
              },
              {
                width: '*',
                text: `(${this.leader[0]['firstName']}  ${this.leader[0]['lastName']})`,
                fontSize: 16,
                alignment: 'center'
              }
            ],
            defaultStyle: {
              font: 'THSarabunNew',
            },
          };
          pdfMake.createPdf(dd).open();
        });
      });
    });
  }
}
