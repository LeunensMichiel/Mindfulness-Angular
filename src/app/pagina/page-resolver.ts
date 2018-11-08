import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PageDataService } from './page-data.service';
import { Exercise } from '../models/exercise.model';

@Injectable()
export class PageResolver implements Resolve<Exercise> {

  constructor(private pageService: PageDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Exercise> {
    return this.pageService.getExercise(route.params['exerciseID']);
  }
}