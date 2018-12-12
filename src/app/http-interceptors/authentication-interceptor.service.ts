import { Injectable } from '@angular/core';
import {AuthenticationService} from '../user/authentication.service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor {

  constructor(private authenticationDataService: AuthenticationService) { }

  /**
   * This function intercepts all outgoing calls and adds in the header a token
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // only if the authenticationDataservice user variable is not undefined
    if(this.authenticationDataService.user$) {
      const clonedRequest = req.clone({

        headers: req.headers.set('Authorization', `Bearer ${this.authenticationDataService.token}`)
      });

      return next.handle(clonedRequest);

    }

    return next.handle(req);
  }
}
