import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../models/admin.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AdminDataService {
  private readonly _appUrl = '/API/superadmin/';

  constructor(private http: HttpClient) {
  }

  getActiveAdmin(): Observable<Admin[]> {
    return this.http
      .get(`${this._appUrl}/activeadmin`)
      .pipe(
        map((list: any[]): Admin[] =>
          list.map(
            it => {
              return Admin.fromJSON(it);
            }
          )
        )
      );
  }

  getNonActifAdmin(): Observable<Admin[]> {
    return this.http
      .get(`${this._appUrl}/nonactiveadmin`)
      .pipe(
        map((list: any[]): Admin[] =>
          list.map(
            it => {
              return Admin.fromJSON(it);
            }
          )
        )
      );
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    return this.http
      .put(`${this._appUrl}/admin/${admin.id}`, admin)
      .pipe(
        map(
          (it: any) => {
            return Admin.fromJSON(it)
          }
        )
      );
  }

  deleteAdmin(admin: Admin): Observable<Admin> {
    return this.http
      .delete(`${this._appUrl}/admin/${admin.id}`)
      .pipe(
        map(
          (it: any) => {
            return Admin.fromJSON(it);
          }
        )
      );
  }
}
