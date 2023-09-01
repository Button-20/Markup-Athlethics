import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HelpHistoryService } from '../../api/help-history/help-history.service';
import { StorageService } from '../../core/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService,
    private socketService: HelpHistoryService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.storage.isAuthenticated() &&
      this.storage.getUserDetails() !== null &&
      Boolean(this.storage.getUserDetails().qrCodeVerified) !== false
    ) {
      if (this.storage.isAuthenticated()) {
        this.socketService.initializeSocket(this.storage.getAccessToken());
        return true;
      }
    }
    this.router.navigateByUrl('auth/signin-alt');
    this.storage.clearAllExceptUserDetails();
    return false;
  }
}
