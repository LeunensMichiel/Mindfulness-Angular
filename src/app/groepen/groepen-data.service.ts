import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { map } from 'rxjs/operators';
import { Sessionmap } from '../models/sessionmap.model';

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

  editGroup(group: Group): Observable<Group> {
    return this.http
      .put(`${this._appUrl}/group/${group.id}`, group)
      .pipe(map(it => {
        const gr = new Group();
        return gr.fromJson(it);
      }));
  }

  removeGroup(gr: Group): Observable<Group> {
    return this.http
      .delete(`${this._appUrl}/group/${gr.id}`)
      .pipe(map(it => {
        const gr = new Group();
        return gr.fromJson(it);
      }));
  }

  get sesmaps(): Observable<Sessionmap[]> {
    return this.http
      .get(`${this._appUrl}/group/sessionmaps`)
      .pipe(map((list:any[]): Sessionmap[] =>
        list.map(
          it => {
            return Sessionmap.fromJson(it);
          }
        )
      ));
  }
}
