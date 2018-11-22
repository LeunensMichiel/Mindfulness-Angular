import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { map } from 'rxjs/operators';
import { Sessionmap } from '../models/sessionmap.model';
import { User } from '../models/user.model';

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
          console.log(it);
          console.log(Group.fromJSON(it));
          return Group.fromJSON(it);
        }
      )
    ));
  }

  addNewGroup(group:Group):Observable<Group>
  {
    return this.http
      .post(`${this._appUrl}/group`, group)
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  editGroup(group: Group): Observable<Group> {
    return this.http
      .put(`${this._appUrl}/group/${group.id}`, group)
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  removeGroup(gr: Group): Observable<Group> {
    return this.http
      .delete(`${this._appUrl}/group/${gr.id}`)
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  get sesmaps(): Observable<Sessionmap[]> {
    return this.http
      .get(`${this._appUrl}/group/sessionmaps`)
      .pipe(map((list:any[]): Sessionmap[] =>
        list.map(
          it => {
            return Sessionmap.fromJSON(it);
          }
        )
      ));
  }

  getEmails(group:Group):Observable<User[]>{
    return this.http
    .get(`${this._appUrl}/group/getUsers/${group.id}`)
    .pipe(map((list:any[]): User[] =>
        list.map(
          it => {
            return User.fromJson(it);
          }
        )
      ));
  }
}
