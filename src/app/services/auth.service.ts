import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IOwner } from '../Models/iowner';

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
  private handleError(error: HttpErrorResponse) {
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
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  registerOwner(owenrObj: IOwner): Observable<any> {
    return this.httpClient
      .post<any>(
        // `${environment.APIURL}/Account/register/owner`,
        'https://localhost:5001/api/Account/register/owner',
        JSON.stringify(owenrObj),
        this.httpOtions
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<any> {
    const baseUrl = 'https://localhost:5001/api/Account/login';
    const params = new HttpParams().set('email', email).set('passwd', password);

    // `${environment.APIURL}/Account/login`,
    return this.httpClient
      .post(baseUrl, {}, { params, headers: this.httpOtions.headers })
      .pipe(catchError(this.handleError));
  }
}
