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
  private _isSuperAdmin$: BehaviorSubject<boolean>;
  private readonly currentUserKey = 'currentUser';
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken;
    let admin: Admin;
    if (this.isAdminStoredLocal()) {

      parsedToken = parseJwt(JSON.parse(localStorage.getItem(this.currentUserKey)).token);

      if (parsedToken) {

        const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();

        if (expires) {

          localStorage.removeItem(this.currentUserKey);
          parsedToken = null;

        } else {
          admin = Admin.fromJSON(
            JSON.parse(localStorage.getItem(this.currentUserKey))
          );
        }
      }
    }
    this._user$ = new BehaviorSubject<Admin>(parsedToken && admin);
    this._isSuperAdmin$ = new BehaviorSubject<boolean>(parsedToken && admin.role.superAdmin);
  }

  get user$(): BehaviorSubject<Admin> {
    return this._user$;
  }

  get isSuperAdmin$(): BehaviorSubject<boolean> {
    return this._isSuperAdmin$;
  }


  get token(): string {
    const localToken = JSON.parse(localStorage.getItem(this.currentUserKey));

    return !!localToken ? localToken.token : '';
  }

  /**
   * This function logs a user in the database
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login/admin`,
      {email: email, password: password})
      .pipe(
        map((res: any) => {
          console.log(res.token);
          return this.storeAdminLocal(res.token);
        })
      );
  }

  /**
   * This function registers a admin in the database
   * @param newAdmin
   * @param password
   */
  register(newAdmin: Admin, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register/admin`, {...newAdmin.toJSON(), password: password})
      .pipe(
        map((res: any) => {
          return this.storeAdminLocal(res.token);
        })
      );
  }

  /**
   * This function stores the user in the localStorage
   * @param json
   */
  storeAdminLocal(json: any): boolean {
    let decodedToken = parseJwt(json);

    let admin = Admin.fromJSON(decodedToken);
    admin.token = json;
    if (admin.token) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(admin.toJSON()));
      this._user$.next(admin);
      this._isSuperAdmin$.next(admin.role.superAdmin);
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function checks if admin has logged in in the last 60 days
   */
  isAdminStoredLocal(): boolean {
    return localStorage.getItem(this.currentUserKey) != null;
  }

  /**
   * This function removes the data of the user out of localstorage
   */
  logout(): void {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => {
          this._user$.next(null);
          this._isSuperAdmin$.next(null);
        }
      );
    }
  }

  /**
   * This function checks if there is a user that already has this email address
   * @param email
   */
  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkemail`, {email: email})
      .pipe(
        map((res: any) => {

          return res.email !== 'alreadyexists';
        })
      );
  }
}
