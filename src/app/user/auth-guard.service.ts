import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private _authtenticationService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authtenticationService.user$.getValue()) {
      return true;
    }

    this._authtenticationService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}