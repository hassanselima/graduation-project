import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private confirmationData = new BehaviorSubject<any>({});
  currentConfirmationData = this.confirmationData.asObservable();
  private userData: any = {};
  private pgData = new BehaviorSubject<any>({});
  constructor() {}

  setConfirmationData(data: any) {
    this.confirmationData.next(data);
  }
  setDataParams(data: any) {
    this.userData = { ...this.userData, ...data };
  }
  getUserData() {
    return this.userData;
  }
  resetUserData() {
    this.userData = {};
  }
  setPgData(data: any) {
    this.pgData.next({ ...this.pgData.getValue(), ...data });
  }
  getPgData() {
    return this.pgData.getValue();
  }
}
