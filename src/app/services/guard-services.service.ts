import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardServicesService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      console.log(error?.error.guardPlaygrounds[0]?.playgroundName);
      return throwError(
        () =>
          new Error(
            'لا يمكن حذف الموظف لانة مرتبط بملعب' +
              ` ${error?.error.guardPlaygrounds[0]?.playgroundName}`
          )
      );
    }

    return throwError(() => new Error('برجاء المحاولة لاحقا'));
  }

  getGuards(ownerId: any | null, token: string | null) {
    const baseUrl = `${environment.APIURL}/Owner/guards`;
    const params = new HttpParams().set('ownerId', ownerId);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(baseUrl, { params, headers });
  }

  delGuard(Id: string, token: string | null) {
    const baseUrl = `${environment.APIURL}/Account/user`;
    const params = new HttpParams().set('id', Id);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .delete(baseUrl, { params, headers })
      .pipe(catchError(this.handleError));
  }
  addGuard(guardData: any, token: string | null) {
    const baseUrl = `${environment.APIURL}/Account/register/guard`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this.http.post(baseUrl, guardData, { headers });
  }
  uploadImage(guardId: any, img: File | null, token: string | null) {
    const baseUrl = `${environment.APIURL}/Guard/guard-picture`;
    const params = new HttpParams().set('guardId', guardId);
    const formData: FormData = new FormData();
    if (img) {
      formData.append('profilePic', img, img.name);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(baseUrl, formData, { params, headers });
  }
}
