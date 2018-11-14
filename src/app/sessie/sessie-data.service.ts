import { Exercise } from 'src/app/models/exercise.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from '../models/sessie.model';
import { map } from 'rxjs/operators';
import { Sessionmap } from '../models/sessionmap.model';


@Injectable()
export class SessieDataService {

  private readonly _appUrl = '/API/session';
  // private _sessies: Session[] = new Array();

  constructor(private http: HttpClient) {
    // this._sessies.push(new Session("Session 1", 1));
  }

  sessies(id: string): Observable<Session[]> {
    return this.http
      .get(`${this._appUrl}/sessions/${id}`)
      .pipe(map((list: any[]): Session[] =>
        list.map(it => {
          var ses = new Session();
          return ses.fromJson(it);
        })));
  }

  addNewSessie(ses: Session): Observable<Session> {
    return this.http
      .post(`${this._appUrl}/session`, ses)
      .pipe(map(it => {
        var ses = new Session();
        return ses.fromJson(it);
      }));
  }

  removeSessie(ses: Session): Observable<Session> {
    return this.http
      .delete(`${this._appUrl}/session/${ses.id}`)
      .pipe(map(it => {
        var ses = new Session();
        return ses.fromJson(it);
      }));
  }

  // addOefeningToSessie(oef: Exercise, ses: Session): Observable<Exercise> {
  //   const theUrl = `${this._appUrl}/sessies/${ses.id}/oefeningen`;
  //   return this.http.post(theUrl, oef).pipe(map(Exercise.fromJson));
  // }
  getSessie(id: string): Observable<Session> {
    return this.http
      .get(`${this._appUrl}/session/${id}`)
      .pipe(map(it => {
        var ses = new Session();

        return ses.fromJson(it);
      }));
  }

  getSessieExercises(session_id: string): Observable<Exercise[]> {
    console.log("CHECK");
    return this.http
      .get(`${this._appUrl}/exercise/${session_id}`)
      .pipe(map((list: any[]): Exercise[] =>
        list.map(
          it => {
            var ex = new Exercise();
            console.log(ex.fromJson(it));
            return ex.fromJson(it);
          }
        )));
  }

  editSession(sessie: Session): Observable<Session> {
    return this.http
      .put(`${this._appUrl}/session/${sessie.id}`, sessie)
      .pipe(map(it => {
        var sMap = new Session();
        return sMap.fromJson(it);
      }));
  }
}
