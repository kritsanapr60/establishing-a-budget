import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl+ "subEquipmentList/subEquipmentList/";

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
