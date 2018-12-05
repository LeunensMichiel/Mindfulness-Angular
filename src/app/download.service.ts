import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseContentType} from '@angular/http';

@Injectable()
export class DownloadService {

  private readonly _appUrl = '/API/file/file';


  constructor(private httpClient: HttpClient) { }

  getFile(url: string, fileName: string): Observable<any> {
    return this.httpClient.get(`${this._appUrl}?object_type=${url}&file_name=${fileName}`, {responseType: "blob"});
  }


  getParagraphImage(fileName: string): Observable<any> {
    return this.getFile("paragraphs_image", fileName);
  }

  getPageAudio(fileName: string): Observable<any> {
    return this.getFile("page_audio", fileName);
  }

  getSessionImage(fileName: string): Observable<any> {
    return this.getFile("session_image", fileName);
  }
}
