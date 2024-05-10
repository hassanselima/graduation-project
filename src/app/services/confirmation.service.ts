import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../Environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private httpClient: HttpClient) {}

  private handleError2(error: HttpErrorResponse): any {
    if (error.status === 400) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      console.error('An error occurred:', error.message);
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
  private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 404) {
      return throwError(() => new Error('User Not Found'));
    } else if (error.status === 400) {
      return throwError(() => new Error('Invalid Code'));
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
  confirmationCode(email: string): Observable<any> {
    const baseUrl = `${environment.APIURL}/Account/confirmation-code?`;
    const params = new HttpParams().set('email', email);
    return this.httpClient
      .get(baseUrl, { params })
      .pipe(catchError(this.handleError));
  }

  confirmEmail(email: string, code: string): Observable<any> {
    const baseUrl = `${environment.APIURL}/Account/email-confirmation?`;
    const params = new HttpParams().set('email', email).set('code', code);
    return this.httpClient
      .put(baseUrl, {}, { params })
      .pipe(catchError(this.handleError));
  }
  resetPassword(email: string, code: string, pass: string) {
    const baseUrl = `${environment.APIURL}/Account/account-recovery`;
    const params = new HttpParams()
      .set('email', email)
      .set('code', code)
      .set('newPassword', pass);

    return this.httpClient
      .put(baseUrl, {}, { params })
      .pipe(catchError(this.handleError2));
  }
}
