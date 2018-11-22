import {Exercise} from 'src/app/models/exercise.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Session} from '../models/session.model';
import {map} from 'rxjs/operators';
import {Sessionmap} from '../models/sessionmap.model';


@Injectable()
export class SessieDataService {

  private readonly _appUrl = '/API/session';

  // private _sessies: Session[] = new Array();

  constructor(private http: HttpClient) {
    // this._sessies.push(new Session("Session 1", 1));
  }

  addNewSession(session: Session, sessionmap_id: string): Observable<HttpEvent<{}>> {
    // let sessionJson = session.toJSON();
    //
    //
    // return this.http
    //   .post(`${this._appUrl}/session`, {...sessionJson, sessionmap_id: sessionmap_id})
    //   .pipe(map(it => {
    //     return Session.fromJSON(it);
    //   }));
    //
    const formdata: FormData = new FormData();

    formdata.append('session_image', session.file);
    formdata.append('session', JSON.stringify(session.toJSON()));
    formdata.append('sessionmap_id', sessionmap_id);

    const req = new HttpRequest('POST', `${this._appUrl}/session`, formdata, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  removeSession(ses: Session): Observable<Session> {
    return this.http
      .delete(`${this._appUrl}/session/${ses.id}`)
      .pipe(map(it => {
        return Session.fromJSON(it);
      }));
  }


  getSession(id: string): Observable<Session> {
    return this.http
      .get(`${this._appUrl}/session_detailed/${id}`)
      .pipe(map(it => {
        return Session.fromJSON(it);
      }));
  }


  editSession(session: Session): Observable<Session> {
    console.log(session);
    return this.http
      .put(`${this._appUrl}/session/${session.id}`, session.toJSON())
      .pipe(map(it => {
        return Session.fromJSON(it);
      }));
  }
}
