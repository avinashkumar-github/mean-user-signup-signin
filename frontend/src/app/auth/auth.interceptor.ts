import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.headers.get('noauth')) {
      return next.handle(request.clone());
    } else {
      const customReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.userService.getToken()
        ),
      });
      return next.handle(customReq).pipe(
        tap(
          (event) => {},
          (error) => {
            error.err.auth == false;
            this.router.navigate(['/signin']);
          }
        )
      );
    }
  }
}
