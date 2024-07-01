import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}
  uploadFile(
    id: any | null,
    isDocumentation: boolean,
    file: File | null,
    token: string | null
  ) {
    const baseUrl = `${environment.APIURL}/Playground/picture`;
    const params = new HttpParams()
      .set('id', id)
      .set('isDocumentation', isDocumentation);
    console.log('form file service: ', id, isDocumentation);
    console.log(params);
    const formData: FormData = new FormData();
    if (file) {
      formData.append('playgroundPicture', file, file.name);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(baseUrl, formData, { params, headers });
  }
}
