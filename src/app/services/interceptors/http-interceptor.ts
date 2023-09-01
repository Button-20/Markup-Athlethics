import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalsService } from '../core/globals';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private globals: GlobalsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.globals.storage.clearAllExceptUserDetails();
      this.globals.spinner.hide();
      this.globals.router.navigate(['/auth/signin-alt']);
    }

    if (error.status === 401) {
      this.globals.storage.clearAllExceptUserDetails();
      this.globals.spinner.hide();
      this.globals.router.navigate(['/auth/signin-alt']);
    }

    return throwError(error);
  }
}
