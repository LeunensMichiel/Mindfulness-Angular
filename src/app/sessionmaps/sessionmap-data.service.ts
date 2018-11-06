import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sessionmap } from '../models/sessionmap.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionmapDataService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) { }

  get sesmaps(): Observable<Sessionmap[]> {
    return this.http
      .get(`${this._appUrl}/sessionmaps`)
      .pipe(map((list:any[]): Sessionmap[] =>
        list.map(
          it => {
            var sMap = new Sessionmap();
            return sMap.fromJson(it);
          }
        )
      ));
  }

  getsesmap(id: string): Observable<Sessionmap> {
    return this.http
      .get(`${this._appUrl}/sessionmap/${id}`)
      .pipe(map(it => {
        var sMap = new Sessionmap();
        return sMap.fromJson(it);
      }));
  }

  addNewSessionMap(sessionmap : Sessionmap): Observable<Sessionmap> {
    console.log(sessionmap.titleCourse);
    return this.http
      .post(`${this._appUrl}/sessionmap`, sessionmap)
      .pipe(map(it => {
        var sMap = new Sessionmap();
        return sMap.fromJson(it);
      }));
  }

  deleteSessionMap(sesmap: Sessionmap): Observable<Sessionmap> {
    return this.http
      .delete(`${this._appUrl}/sessionmap/${sesmap.id}`)
      .pipe(map(it => {
        var sMap = new Sessionmap();
        return sMap.fromJson(it);
      }));
  }

  wijzigSessionMap(sesmap: Sessionmap): Observable<Sessionmap> {
    return this.http
      .put(`${this._appUrl}/sessionmap/${sesmap.id}/update`, sesmap)
      .pipe(map(it => {
        var sMap = new Sessionmap();
        return sMap.fromJson(it);
      }));
  }
}
