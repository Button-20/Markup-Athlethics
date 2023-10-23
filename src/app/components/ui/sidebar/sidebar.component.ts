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

  adminNavigations: { name: string; route: string; image: string }[] = [
    {
      name: 'Dashboard',
      route: '/admin/dashboard',
      image: 'assets/images/grid.png',
    },
    {
      name: 'Approvals',
      route: '/admin/approvals',
      image: 'assets/images/rotate-ccw.png',
    },
    {
      name: 'Athletes',
      route: '/admin/athletes',
      image: 'assets/images/dumbbell.png',
    },
    {
      name: 'Coaches',
      route: '/admin/coaches',
      image: 'assets/images/users.png',
    },
    {
      name: 'News',
      route: '/admin/news',
      image: 'assets/images/book-open.png',
    },
    {
      name: 'Connections',
      route: '/admin/connections',
      image: 'assets/images/mdi_connection.png',
    },
    {
      name: 'Settings',
      route: '/admin/settings',
      image: 'assets/images/settings.png',
    },
    {
      name: 'Admins',
      route: '/admin/admins',
      image: 'assets/images/user.png',
    },
  ];

  @Input() openSidebar: boolean = false;
  @Input() showMenuName: boolean = false;

  constructor(
    private globals: GlobalsService,
    private authService: AuthService
  ) {
    switch (this.globals.user?.user_type) {
      case '3':
        this.navigations = this.adminNavigations;
        break;
      case '2':
        this.navigations = this.navigations.filter(
          (nav) => nav.name !== 'Profile'
        );
        break;
      case '1':
        this.navigations = this.navigations.filter(
          (nav) => nav.name !== 'Connections' && nav.name !== 'Athletics'
        );
        break;
      default:
        this.navigations = this.navigations.filter(
          (nav) => nav.name !== 'Profile'
        );
        break;
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
