import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BACKEND_URL = "http://localhost:8080/subEquipmentList/subEquipmentList/";

@Injectable({
  providedIn: 'root'
})
export class ListSubEquipmentsService {
  constructor(private http:HttpClient) { }

  addList() {}

  getList() {
    return this.http.get<{message: string, response: any}>(BACKEND_URL);
  }

  getListByName(main: string) {
    console.log(main);
    return this.http.get<{message: string, response: any}>(BACKEND_URL);
  }
}
