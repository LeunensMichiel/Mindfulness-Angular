import { Exercise } from 'src/app/models/exercise.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sessie } from '../models/sessie.model';
import { map } from 'rxjs/operators';


@Injectable()
export class SessieDataService {

  private readonly _appUrl = '/API';
  private _sessies: Observable<Sessie[]>;

  constructor(private http: HttpClient) {}

  get sessies(): Observable<Sessie[]> {
    return this.http
      .get(`${this._appUrl}/sessies/`)
      .pipe(map((list: any[]): Sessie[] => list.map(Sessie.fromJSON)));
  }

  addNewSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .post(`${this._appUrl}/sessies/`, ses)
      .pipe(map(Sessie.fromJSON));
  }

  removeSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .delete(`${this._appUrl}/sesies/${ses.get_id()}`)
      .pipe(map(Sessie.fromJSON));
  }

 /*  addOefeningToSessie(oef: Exercise, ses: Sessie): Observable<Exercise> {
    const theUrl = `${this._appUrl}/sessies/${ses.id}/oefeningen`;
    return this.http.post(theUrl, oef).pipe(map(Exercise.fromJSON));
  }
 */
  getSessie(id: string): Observable<Sessie> {
    return this.http
      .get(`${this._appUrl}/sessie/${id}`)
      .pipe(map(Sessie.fromJSON));
  }
}
