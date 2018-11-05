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

  get sessies(): Observable<any[]> {
    return this.http
      .get(`${this._appUrl}/sessies`)
      .pipe(map((list: any[]): Sessie[] => list.map(Sessie.fromJson)));
  }

  addNewSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .post(`/API/sessionmaps`, ses)
      .pipe(map(Sessie.fromJson));
  }

  removeSessie(ses: Sessie): Observable<Sessie> {
    return this.http
      .delete(`${this._appUrl}/sesies/${ses.id}`)
      .pipe(map(Sessie.fromJson));
  }

  addOefeningToSessie(oef: Exercise, ses: Sessie): Observable<Exercise> {
    const theUrl = `${this._appUrl}/sessies/${ses.id}/oefeningen`;
    return this.http.post(theUrl, oef).pipe(map(Exercise.fromJson));
  }
  getSessie(id: string): Observable<Sessie> {
    return this.http
      .get(`${this._appUrl}/sessie/${id}`)
      .pipe(map(Sessie.fromJson));
  }

  // get sessies(): Sessie[] {
  //   return this._sessies;
  // }

  // addNewSessie(ses: Sessie): void {
  //   this._sessies.push(ses);
  // }

  // removeSessie(ses: Sessie): void {
  //   this._sessies.splice(this._sessies.indexOf(ses), 1);
  // }

  // addOefToSessie(oef: Exercise, ses: Sessie) {
  //   ses.addItem(ses.items.length, oef);
  // }
}
