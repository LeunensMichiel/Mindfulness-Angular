import { Injectable } from '@angular/core';
import { Sessie } from '../models/sessie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessieDataService {

  private _sessies = new Array<Sessie>();

  constructor() {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < nums.length; i++) {
      let sessie = new Sessie(i +1);
      this._sessies.push(sessie);
    }
  }
 
  get sessies(): Sessie[] {
    return this._sessies;
  }

  addNewSessie() {
    this._sessies.push(new Sessie(this._sessies.length + 1));
  }
}
