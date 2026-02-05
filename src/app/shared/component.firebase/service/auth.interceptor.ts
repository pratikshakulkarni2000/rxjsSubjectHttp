import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService : AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
     next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

      //API call start ::: spinner starts

      this._authService.setSpinnerStatus(true)

      const modifiedReq = request.clone({
        setHeaders : {
          Auth : 'Token Form LS'
        }
      })

    return next.handle(request)
      .pipe(
          finalize(() => {
            this._authService.setSpinnerStatus(false)
          })
      )
  }
}
