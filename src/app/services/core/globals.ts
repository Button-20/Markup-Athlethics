import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { getNameList, getNames } from 'country-list';
import { Sports, User } from './IApp';
import { SpinnerService } from './spinner';
import { StorageService } from './storage';
import { ToasterService } from './toaster';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  user: User | null = null;
  countries: Array<any> = [];
  sports: Sports[] = [];

  constructor(
    public storage: StorageService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location,
    public toast: ToasterService,
    public reuseStrategy: RouteReuseStrategy,
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

  isLoggedIn(): boolean {
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

  enablePhoneInput() {
    let phoneInput = document.querySelector('#phone') as HTMLInputElement;
    if (phoneInput) {
      phoneInput.disabled = !phoneInput.disabled;
    }
  }

  scrollToBottom() {
    const element = document.getElementById('messages') as HTMLElement;
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 100);
  }

  getCountryCode(country: string) {
    let countries: { [name: string]: string } = getNameList();
    return countries[country?.toLowerCase()]?.toLowerCase();
  }

  convertCMtoFeet(cm: string) {
    let feet = Math.floor(Number(cm) / 30.48);
    let inches = Math.round((Number(cm) / 30.48 - feet) * 12);
    return `${feet}' ${inches}"`;
  }

  convertPoundsToKg(pounds: string) {
    return Math.round(Number(pounds) / 2.205);
  }
}
