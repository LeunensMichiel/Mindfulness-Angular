import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  private _url = '/API/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.email);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login/admin`,
      {email: email, password: password})
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem('currentUser', JSON.stringify({email: email, token: token}));
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
