import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DownloadService {

  private readonly _appUrl = '/API/file/file';


  constructor(private httpClient: HttpClient) { }

  getFile(fileUrl: String): Observable<Blob> {
    return this.httpClient.post(`${this._appUrl}`, {path: fileUrl}, {responseType: 'blob'});
  }
}
