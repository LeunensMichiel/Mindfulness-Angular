import { Injectable } from '@angular/core';
import {AuthenticationService} from '../user/authentication.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class SuperAdminAuthGuard {

  constructor(private _authtenticationService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let admin = this._authtenticationService.user$.getValue();

    if (admin) {
      if (admin.role.superAdmin) {
        return true;
      }
    }

    this._authtenticationService.redirectUrl = state.url;
    this.router.navigate(['/']);
    return false;
  }
}
