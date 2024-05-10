import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashServicesService {
  constructor(private http: HttpClient) {}

  stats(ownerId: any | null, token: any | null) {
    const baseUrl = `${environment.APIURL}/Owner/stats`;
    const params = new HttpParams().set('ownerId', ownerId);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(baseUrl, { params, headers });
  }
  playgrounds(ownerId: any | null, token: any | null) {
    const baseUrl = `${environment.APIURL}/Owner/playgrounds`;
    const params = new HttpParams().set('ownerId', ownerId);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(baseUrl, { params, headers });
  }
  changeState(playgroundId: number, state: boolean, token: string | null) {
    const baseUrl = `${environment.APIURL}/Playground/state`;
    const params = new HttpParams()
      .set('playgroundId', playgroundId)
      .set('isActive', state);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(baseUrl, {}, { params, headers });
  }
}
