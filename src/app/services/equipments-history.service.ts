import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "history/history";

@Injectable({
  providedIn: "root",
})
export class EquipmentsHistoryService {
  // api: string = "http://localhost:8080/history/history";
  constructor(public http: HttpClient, public router: Router) {}

  addHistory(
    id: string,
    firstName: string,
    lastName: string,
    position: string,
    learningGroup: string,
    subjectTeach: string,
    reason: string,
    objective: string,
    typeEquipment: string,
    learningGroups: string,
    majorList: string,
    budget: number,
    necessary: number,
    existEquipment: number,
    otherReason: string,
    dateProject: Date,
    condition: string,
    status: string,
    approveCondition: string,
    approveReason: string,
    creator: string,
    listSubEquipment: object
  ) {
    const history = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      position: position,
      learningGroup: learningGroup,
      subjectTeach: subjectTeach,
      reason: reason,
      objective: objective,
      typeEquipments: typeEquipment,
      learningGroups: learningGroups,
      majorList: majorList,
      budget: budget,
      necessary: necessary,
      existEquipment: existEquipment,
      otherReason: otherReason,
      dateProject: dateProject,
      condition: condition,
      status: status,
      approveCondition: approveCondition,
      approveReason: approveReason,
      creator: creator,
      listSubEquipment: listSubEquipment,
    };
    // console.log('History :', history);
    this.http.post<{ message: string }>(BACKEND_URL, history).subscribe(
      (response) => {
        // console.log("Insert data success" , response);
      },
      (error) => {
        // console.log(`error message is ${error}`);
      }
    );
  }

  getHistory() {
    return this.http.get<{ message: string; response: any }>(BACKEND_URL);
    // .subscribe(
    //   (response) => {
    //     console.log(response.response);
    //   },
    //   (error) => {
    //     console.log(`error message is ${error}`);
    //   }
    // );
  }

  getOneHistories(id: string) {
    return this.http.get<{mesage: string, response: any}>(BACKEND_URL + '/' + id);
  }

  deleteHistory(id: string) {
    this.http.delete<{ message: string }>(BACKEND_URL + "/" + id).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(`error message is ${error}`);
      }
    );
  }

  deleteOneHistory() {
    this.http.get<{ message: string }>(BACKEND_URL).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(`error message is ${error}`);
      }
    );
  }
}
