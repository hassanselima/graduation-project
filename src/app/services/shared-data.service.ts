import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private confirmationData = new BehaviorSubject<any>({});
  currentConfirmationData = this.confirmationData.asObservable();
  private userData: any = {};

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
}
