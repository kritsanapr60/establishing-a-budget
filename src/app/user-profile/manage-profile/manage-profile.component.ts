import { Component, OnInit } from '@angular/core';


export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  position: string;
}

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  userData: UserData[] = [
    {firstName: 'กฤษณะ', lastName: 'ประสิทธิ์', email: 'kritsana.pr.60@ubu.ac.th', phone: '09876543221', gender: 'ชาย', age: '22', position: 'ผู้ดูแลระบบ'},
  ]
  constructor() { }

  ngOnInit(): void {
  }



}
