import { Injectable } from '@angular/core';
import { Sessie } from '../models/sessie.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SessieDataService {

  private _sessies: Sessie[];

  constructor() { }

  get sessies(): Observable<Sessie[]> {
    return this._sessies;
  }

  addNewSessie(sessie: Sessie) {
    this._sessies.push(sessie);
  }
}
