import {Injectable} from '@angular/core';
import {Sessionmap} from '../models/sessionmap.model';
import {Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot} from '@angular/router';
import {SessionmapDataService} from './sessionmap-data.service';
import {Observable} from 'rxjs';

@Injectable()
export class Sessionmapresolver implements Resolve<Sessionmap> {
  constructor(private dataService: SessionmapDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Sessionmap> {
    return this.dataService.getsesmap(route.params['courseID']);
  }
}
