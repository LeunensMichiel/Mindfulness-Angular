import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Sessie } from '../models/sessie.model';
import { Observable } from 'rxjs';
import { SessieDataService } from './sessie-data.service';

@Injectable()
export class SessieResolver implements Resolve<Sessie> {
  constructor(private sessieService: SessieDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Sessie> {
    return this.sessieService.getSessie(route.params['id']);
  }
}