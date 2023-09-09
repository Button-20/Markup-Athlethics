import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalsService } from '../core/globals';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private globals: GlobalsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.globals.storage.getAccessToken();

    const exceptionUrls: string[] = [];

    if (token && !this.includesExceptionUrl(request.url, exceptionUrls)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  private includesExceptionUrl(url: string, exceptionUrls: string[]): boolean {
    for (const exceptionUrl of exceptionUrls) {
      if (url.includes(exceptionUrl)) {
        return true;
      }
    }
    return false;
  }
}
