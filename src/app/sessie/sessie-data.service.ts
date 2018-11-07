import { Exercise } from 'src/app/models/exercise.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sessie } from '../models/sessie.model';
import { map } from 'rxjs/operators';
import {Sessionmap} from '../models/sessionmap.model';


@Injectable()
export class SessieDataService {

  private readonly _appUrl = '/API';
  // private _sessies: Sessie[] = new Array();

  constructor(private http: HttpClient) {
    // this._sessies.push(new Sessie("Sessie 1", 1));
  }

  sessies(id: string): Observable<Sessie[]> {
    return this.http
      .get(`${this._appUrl}/sessions/${id}`)
      .pipe(map((list: any[]): Sessie[] =>
        list.map(it => {
        var ses = new Sessie();
        return ses.fromJson(it);
      })));
  }

  addNewSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .post(`${this._appUrl}/session`, ses)
      .pipe(map(it => {
        var ses = new Sessie();
        return ses.fromJson(it);
      }));
  }

  removeSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .delete(`${this._appUrl}/session/${ses.id}`)
      .pipe(map(it => {
        var ses = new Sessie();
        return ses.fromJson(it);
      }));
  }

  // addOefeningToSessie(oef: Exercise, ses: Sessie): Observable<Exercise> {
  //   const theUrl = `${this._appUrl}/sessies/${ses.id}/oefeningen`;
  //   return this.http.post(theUrl, oef).pipe(map(Exercise.fromJson));
  // }
  getSessie(id: string): Observable<Sessie> {
    return this.http
      .get(`${this._appUrl}/sessie/${id}`)
      .pipe(map(it => {
        var ses = new Sessie();
        return ses.fromJson(it);
      }));
  }

  editSession(sessie: Sessie): Observable<Sessie> {
    return this.http
      .put(`${this._appUrl}/session/${sessie.id}`, sessie)
      .pipe(map(it => {
        var sMap = new Sessie();
        return sMap.fromJson(it);
      }));
  }
}
