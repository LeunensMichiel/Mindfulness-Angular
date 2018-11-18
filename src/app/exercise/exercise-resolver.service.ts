import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';
import {ExerciseDataService} from './exercise-data.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class ExerciseResolver implements Resolve<Exercise>{

  constructor(private _exerciseDataService: ExerciseDataService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Exercise>  {
    return this._exerciseDataService.getExercise(route.params['exerciseID']);
  }


}
