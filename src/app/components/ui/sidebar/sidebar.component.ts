import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navigations: { name: string; route: string; image: string }[] = [
    {
      name: 'Dashboard',
      route: '/portal/dashboard',
      image: 'assets/images/grid.png',
    },
    {
      name: 'Profile',
      route: '/portal/profile',
      image: 'assets/images/user.png',
    },
    {
      name: 'Athletics',
      route: '/portal/athletics',
      image: 'assets/images/users.png',
    },
    {
      name: 'Connections',
      route: '/portal/connections',
      image: 'assets/images/mdi_connection.png',
    },
    {
      name: 'News',
      route: '/portal/news',
      image: 'assets/images/book-open.png',
    },
    {
      name: 'Settings',
      route: '/portal/settings',
      image: 'assets/images/settings.png',
    },
  ];

  @Input() openSidebar: boolean = false;

  constructor(
    private globals: GlobalsService,
    private authService: AuthService
  ) {
    if (this.globals.user?.user_type !== '2') {
      this.navigations = this.navigations.filter(
        (nav) => nav.name !== 'Connections' && nav.name !== 'Athletics'
      );
    } else {
      this.navigations = this.navigations.filter(
        (nav) => nav.name !== 'Profile'
      );
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
