import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../models/admin.model';
import {decode} from 'punycode';


function parseJwt(token) {
  if (!token) {
    return null;
  }

  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private _url = '/API/users';
  private _user$: BehaviorSubject<Admin>;
  private readonly currentUserKey = 'currentUser';
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken;
    let admin;
    if (this.isAdminStoredLocal()) {

      parsedToken = parseJwt(JSON.parse(localStorage.getItem(this.currentUserKey)).token);

      if (parsedToken) {

        const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();

        if (expires) {

          localStorage.removeItem(this.currentUserKey);
          parsedToken = null;

        } else {
          admin = Admin.fromJSON(
            localStorage.getItem(this.currentUserKey)
          );
        }
      }
    }
    this._user$ = new BehaviorSubject<Admin>(parsedToken && admin);

  }

  get user$(): BehaviorSubject<Admin> {
    return this._user$;
  }

  get token(): string {
    const localToken = JSON.parse(localStorage.getItem(this.currentUserKey));

    return !!localToken ? localToken.token : '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login/admin`,
      {email: email, password: password})
      .pipe(
        map((res: any) => {

          return this.storeAdminLocal(res.token);
        })
      );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register/admin`, {email: email, password: password})
      .pipe(
        map((res: any) => {
          return this.storeAdminLocal(res.token);
        })
      );
  }

  storeAdminLocal(json: any): boolean {
    let decodedToken = parseJwt(json);

    let admin = Admin.fromJSON(decodedToken);
    admin.token = json;
    console.log(admin);
    if (admin.token) {
      console.log(admin.toJSON());
      localStorage.setItem(this.currentUserKey, JSON.stringify(admin.toJSON()));
      this._user$.next(admin);
      return true;
    } else {
      return false;
    }
  }

  isAdminStoredLocal(): boolean {
    return localStorage.getItem(this.currentUserKey) != null;
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkemail`, {email: email})
      .pipe(
        map((res: any) => {

          return res.email !== 'alreadyexists';
        })
      );
  }
}
