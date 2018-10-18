import { Injectable } from '@angular/core';
import { Sessie } from '../models/sessie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessieDataService {

  private _sessies = new Array<Sessie>();

  constructor() {
  }

  get sessies(): Sessie[] {
    return this._sessies;
  }

  addNewSessie() {
    this._sessies.push(new Sessie(this._sessies.length+1));
  }
}
