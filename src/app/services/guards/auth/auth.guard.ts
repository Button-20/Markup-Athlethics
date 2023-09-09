import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../core/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.storage.isAuthenticated() &&
      this.storage.getUserDetails() !== null
    ) {
      return true;
    }
    this.router.navigateByUrl('auth/login');
    this.storage.clearAllStorage();
    return false;
  }
}
