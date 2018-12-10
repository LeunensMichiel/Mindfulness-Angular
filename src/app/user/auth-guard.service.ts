import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _authtenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let admin = this._authtenticationService.user$.getValue();

    if (admin) {
      if (admin.role.admin || admin.role.superAdmin) {
        if (admin.adminActive) {
          return true;
        } else {
          this.router.navigate(['/not-active']);
          return false;
        }
      }
    }

    this._authtenticationService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
