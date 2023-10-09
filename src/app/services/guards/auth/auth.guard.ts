import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsService } from '../../core/globals';
import { StorageService } from '../../core/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private globals: GlobalsService,
    private storage: StorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | UrlTree {
    if (
      this.storage.isAuthenticated() &&
      this.storage.getUserDetails() !== null
    ) {
      return true;
    }
    this.globals.router.navigate(['auth'], {
      queryParams: { redirectUrl: state.url },
    });

    this.storage.clearAllStorage();
    return false;
  }
}
