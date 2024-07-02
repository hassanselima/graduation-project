import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

export interface Profile {
  ownerId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = `${environment.APIURL}/Owner/owner`;

  constructor(private http: HttpClient) { }

  saveProfile(profile: Profile): Observable<any> {
    return this.http.put(this.apiUrl, profile); // Changed to PUT
  }

  getProfile(ownerId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${ownerId}`);
  }
} 
