import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  navigations: {
    name: string;
    route: string;
    description: string;
  }[] = [
    {
      name: 'Account Data',
      route: '',
      description: 'Edit the details below to update your personal data.',
    },
    {
      name: 'Update Password',
      route: '/update-password',
      description: 'Update your password here',
    },
    {
      name: 'Preferences',
      route: '/preferences',
      description: 'Update your preferences here.',
    },
    {
      name: 'Deactivate Account',
      route: '/deactivate-account',
      description: '',
    },
  ];

  currentNav: { name: string; route: string; description: string } = {
    name: '',
    route: '',
    description: '',
  };
  subscription: any;
  constructor(public globals: GlobalsService) {
    this.subscription = this.globals.router.events.subscribe((event) => {
      this.currentNav = this.navigations.find(
        (nav) =>
          nav.route.replace('/', '') ===
          (this.globals.router.url.split('/')[3] || '')
      ) || { name: '', route: '', description: '' };
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
