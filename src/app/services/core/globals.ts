import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getNames } from 'country-list';
import { User } from './IApp';
import { SpinnerService } from './spinner';
import { StorageService } from './storage';
import { ToasterService } from './toaster';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  user: User | null = null;
  countries: Array<any> = [];

  constructor(
    public storage: StorageService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location,
    public toast: ToasterService,
    public spinner: SpinnerService
  ) {
    this.user = this.storage.getUserDetails() || null;
    this.countries = getNames();
  }

  async loggedOut() {
    this.storage.logOutUser();
  }

  goBack() {
    this.location.back();
  }

  async isLoggedIn() {
    return this.storage.isAuthenticated();
  }

  closeModal(modalId?: string) {
    if (modalId) {
      let closeBtn = document.querySelector(
        `${modalId} .closeBtn`
      ) as HTMLElement;
      if (closeBtn) closeBtn.click();
    } else {
      // remove modal backdrop
      const element = document.querySelector('.modal-backdrop');
      if (element) element.remove();

      // remove modal open class
      const element2 = document.querySelector('.modal-open');

      if (element2) {
        element2.classList.remove('modal-open');
        element2.removeAttribute('style');
      }
    }
  }

  openModal(modalId: string) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('style', 'display: none;');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `${modalId}`);
    document.body.appendChild(button);
    button.click();
  }

  scrollToBottom() {
    const element = document.getElementById('messages') as HTMLElement;
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
}
