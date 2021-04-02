import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-more-detail',
  templateUrl: './more-detail.component.html',
  styleUrls: ['./more-detail.component.css']
})
export class MoreDetailComponent implements OnInit {
  dataInStatus;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: string }) { }

  ngOnInit(): void {
    this.dataInStatus = this.data.data;
    console.log(this.dataInStatus);
  }

}
