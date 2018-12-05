import { Injectable } from '@angular/core';
import {AuthenticationService} from '../user/authentication.service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor {

  constructor(private authenticationDataService: AuthenticationService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authenticationDataService.user$) {
      const clonedRequest = req.clone({

        headers: req.headers.set('Authorization', `Bearer ${this.authenticationDataService.token}`)
      });

      return next.handle(clonedRequest);

    }

    return next.handle(req);
  }
}
