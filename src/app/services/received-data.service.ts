import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceivedDataService {
  private confirmationData = new BehaviorSubject<any>({});
  currentConfirmationData = this.confirmationData.asObservable();

  constructor() {}

  setConfirmationData(data: any) {
    this.confirmationData.next(data);
  }
}
