import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../models/exercise.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class OefeningDataService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) { }

  get oefeningen(): Observable<any[]> {
    return this.http
      .get(`${this._appUrl}/oefeningen`)
      .pipe(map((list: any[]): Exercise[] => list.map(it => {
        var oef = new Exercise();
        return oef.fromJson(it);
      })));
  }

  removeOefening(ses: Exercise): Observable<Exercise> {
    return this.http
      .delete(`${this._appUrl}/oefeningen/${ses.id}`)
      .pipe(map(it => {
        var oef = new Exercise();
        return oef.fromJson(it);
      }));
  }

  addOefeningToSessie(page: Page, ses: Exercise): Observable<Exercise> {
    const theUrl = `${this._appUrl}/sessies/${ses.id}/oefeningen`;
    return this.http.post(theUrl, page).pipe(map(it => {
      var oef = new Exercise();
      return oef.fromJson(it);
    }));
  }
  getOefening(id: string): Observable<Exercise> {
    return this.http
      .get(`${this._appUrl}/oefening/${id}`)
      .pipe(map(it => {
        var oef = new Exercise();
        return oef.fromJson(it);
      }));
  }
}
