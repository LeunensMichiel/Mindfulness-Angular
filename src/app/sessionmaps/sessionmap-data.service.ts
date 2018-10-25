import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sessionmap } from '../models/sessionmap.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionmapDataService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) { }

  get sesmaps(): Observable<Sessionmap[]> {
    return this.http
      .get(`${this._appUrl}/sessionmaps`)
      .pipe(map((list: any[]): Sessionmap[] => list.map(Sessionmap.fromJSON)));
  }
}
