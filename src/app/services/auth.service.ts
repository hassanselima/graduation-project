import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IOwner } from '../Models/iowner';
import { environment } from '../Environments/environment';
import { ILoginObj } from '../Models/LoginObj';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOtions;
  constructor(private httpClient: HttpClient) {
    this.httpOtions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        // Authorization: 'my-auth-token',
      }),
    };
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('please try again later.'));
  }

  registerOwner(owenrObj: IOwner): Observable<any> {
    const baseUrl = `${environment.APIURL}/Account/register/owner`;
    return this.httpClient
      .post(baseUrl, owenrObj)
      .pipe(retry(2), catchError(this.handleError));
  }

  login(ownerObj: ILoginObj): Observable<any> {
    const baseUrl = `${environment.APIURL}/Account/login`;
    const params = new HttpParams()
      .set('email', ownerObj.email)
      .set('passwd', ownerObj.password);
    console.log(ownerObj.email, ownerObj.password);
    console.log(params);

    return this.httpClient
      .post(baseUrl, {}, { params, headers: this.httpOtions.headers })
      .pipe(retry(2), catchError(this.handleError));
  }
}
