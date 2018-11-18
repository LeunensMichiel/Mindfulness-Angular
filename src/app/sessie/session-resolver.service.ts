import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Session } from '../models/session.model';
import { Observable } from 'rxjs';
import { SessieDataService } from './sessie-data.service';

@Injectable()
export class SessionResolver implements Resolve<Session> {
  constructor(private _sessionDataService: SessieDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Session> {
    return this._sessionDataService.getSession(route.params['sessionID']);
  }
}
