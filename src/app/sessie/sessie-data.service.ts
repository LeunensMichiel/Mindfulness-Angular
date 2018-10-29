import { Exercise } from 'src/app/models/exercise.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sessie } from '../models/sessie.model';
import { map } from 'rxjs/operators';


@Injectable()
export class SessieDataService {

  private readonly _appUrl = '/API';
  private _sessies: Sessie[] = new Array();

  constructor(private http: HttpClient) {
    // this._sessies.push(new Sessie("Sessie 1", 1));
  }

  // get sessies(): Observable<Sessie[]> {
  //   return this.http
  //     .get(`${this._appUrl}/sessies`)
  //     .pipe(map((list: any[]): Sessie[] => list.map(Sessie.fromJSON)));
  // }

  // addNewSessie(ses: Sessie): Observable<Sessie> {
  //   return this.http
  //     .post(`/API/sessionmaps`, ses)
  //     .pipe(map(Sessie.fromJSON));
  // }

  // removeSessie(ses: Sessie): Observable<Sessie> {
  //   return this.http
  //     .delete(`${this._appUrl}/sesies/${ses.get_id()}`)
  //     .pipe(map(Sessie.fromJSON));
  // }

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

  get sessies(): Sessie[] {
    return this._sessies.sort(this.compare);
  }

  addNewSessie(ses: Sessie): void {
    this._sessies.push(ses);
  }

  removeSessie(ses: Sessie): void {
    this._sessies.splice(this._sessies.indexOf(ses), 1);
    
  }

  compare(a: Sessie, b: Sessie) {
    if (a.get_nr < b.get_nr)
      return -1;
    if (a.get_nr > b.get_nr)
      return 1;
    return 0;
  }
}
