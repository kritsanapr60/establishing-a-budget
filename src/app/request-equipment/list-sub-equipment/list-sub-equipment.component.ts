import { SubEquipmentsService } from './../../services/sub-equipments.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-sub-equipment',
  templateUrl: './list-sub-equipment.component.html',
  styleUrls: ['./list-sub-equipment.component.css']
})
export class ListSubEquipmentComponent implements OnInit {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private subServices:SubEquipmentsService, private userServices: UsersService,
   ) { }

  ngOnInit(): void {
    this.userServices.autoAuthUser();
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });

    // this.subServices.getEquipmentBySunId().subscribe(data => {
    //   console.log(data);
    // })
  }

  deleteEquipment() {

  }
}
