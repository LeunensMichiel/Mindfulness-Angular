import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  private readonly _appUrl = '/API';

  constructor(private http:HttpClient) { }

  getExercise(id: string):Observable<Exercise> {
    return this.http
      .get(`${this._appUrl}/exerciseWpages/${id}`)
      .pipe(map(it => {
        var ex = new Exercise();
        return ex.fromJson(it);
      }))
  }
}
