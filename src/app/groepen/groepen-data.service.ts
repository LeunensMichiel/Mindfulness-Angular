import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { map } from 'rxjs/operators';
import { Sessionmap } from '../models/sessionmap.model';
import { User } from '../models/user.model';
import { Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class GroepenDataService {
  private readonly _appUrl = 'API/group';

  constructor(private http:HttpClient) { }

  /**
   * Deze functie roept de api call op die alle groepen returnt
   * de groepen worden gesorteerd op actief en naam
   */
  get groups():Observable<Group[]>{
    return this.http
    .get(`${this._appUrl}/groups`)
    .pipe(map((list:any[]): Group[] =>
      list.map(
        it => {
          return Group.fromJSON(it);
        }
      )
    ));
  }

  /**
   * Deze functie roept de api call op die een nieuwe groep aanmaakt
   * @param group de nieuwe groep wordt meegegeven
   */
  addNewGroup(group:Group):Observable<Group>
  {
    return this.http
      .post(`${this._appUrl}/group`, group)
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  /**
   * Deze functie roept de api call op die een groep wijzigt
   * @param group de gewijzigde groep wordt meegegeven
   */
  editGroup(group: Group): Observable<Group> {
    return this.http
      .put(`${this._appUrl}/group/${group.id}`, {group:group, sessionmap_id:group.sessionmap_id, name:group.name,actief:group.actief})
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  /**
   * Deze functie roept de api call op die een groep verwijdert
   * @param gr de groep die verwijderd moet worden wordt meegegeven
   */
  removeGroup(gr: Group): Observable<Group> {
    return this.http
      .delete(`${this._appUrl}/group/${gr.id}`)
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }

  /**
   *Deze functie roept de api call op die de sessiemappen returnt
   */
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

  /**
   * Deze functie roept de api call op die de gebruikers van een groep returnt
   * @param group de groep wordt meegegeven
   */
  getUsers(group:Group):Observable<User[]>{
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

  /**
   * Deze functie roept de api call op die de mogelijke gebruikers returnt die toegevoegd kunnen worden aan een groep
   * Gebruikers die toegevoegd kunnen worden: gebruikers die niet in de groep zitten en die geen admin zijn
   * @param group de groep wordt meegegeven
   */
  getPossibleUsers(group:Group):Observable<User[]>{
    return this.http
    .get(`${this._appUrl}/group/getPossibleUsers/${group.id}`)
    .pipe(map((list:any[]): User[] =>
        list.map(
          it => {
            return User.fromJson(it);
          }
        )
      ));
  }

  /**
   * Deze functie roept de api call op die gebruiker(s) toevoegt aan een groep
   * @param groep de groep wordt meegegeven
   * @param userS de gebruiker(s) worden meegegeven
   */
  addUserToGroup(groep:string,userS:string[]):Observable<string>{
    return this.http
      .post(`${this._appUrl}/group/addMyUserToMyGroup`,{group:groep,users:userS})
      .pipe(
        map((it:any) => {
            //return it.toString();
            return it.resultaat;
          }
        )
      );
  }

  /**
   * Deze functie roept de api call op die een gebruiker verwijdert uit een groep
   * @param id de id van de gebruiker wordt meegegeven
   */
  deleteUserFromGroup(id:string[]):Observable<string>{
    console.log(id);
    return this.http
      .post(`${this._appUrl}/group/deleteUserFromGroup`,{users:id})
      .pipe(
        map((it:any) => {
            return it.resultaat;
          }
        )
      );
  }

  /**
   * Deze functie roept de api call op die een notificatie in een groep steekt
   * @param group de groep wordt meegegeven
   * @param notific de notificatie wordt meegegeven
   */
  sendNotificationToGroup(group: Group,notific:Notification): Observable<Group> {
    return this.http
      .put(`${this._appUrl}/group/sendNotification/${group.id}`, {notification:notific})
      .pipe(map(it => {
        return Group.fromJSON(it);
      }));
  }
}
