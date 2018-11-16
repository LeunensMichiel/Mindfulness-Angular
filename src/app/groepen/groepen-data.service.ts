import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroepenDataService {
  private readonly _appUrl = 'API/group';

  constructor(private http:HttpClient) { }

  
  get groups():Observable<Group[]>{
    return this.http
    .get(`${this._appUrl}/groups`)
    .pipe(map((list:any[]): Group[] =>
      list.map(
        it => {
          const g = new Group();
          return g.fromJson(it);
        }
      )
    ));
  }

  addNewGroup(group:Group):Observable<Group>
  {
    return this.http
      .post(`${this._appUrl}/group`, group)
      .pipe(map(it => {
        const group= new Group();
        return group.fromJson(it);
      }));
  }
}
