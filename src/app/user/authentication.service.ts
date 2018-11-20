import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


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
  private _user$: BehaviorSubject<string>;
  private readonly _tokenKey = "currentUser";
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(JSON.parse(localStorage.getItem(this._tokenKey)).token);
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.email);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = JSON.parse(localStorage.getItem(this._tokenKey));
    return !!localToken ? localToken.token: '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login/admin`,
      {email: email, password: password})
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, JSON.stringify({email: email, token: token}));
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register/admin`, {email: email, password: password})
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem('currentUser', JSON.stringify({email: email, token: res.token}));
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
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

          if (res.email === 'alreadyexists') {
            return false;
          } else {
            return true;
          }
        })
      );
  }
}
