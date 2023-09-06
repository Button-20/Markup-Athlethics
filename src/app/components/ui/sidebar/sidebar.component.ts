import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navigations: { name: string; route: string; image: string }[] = [
    {
      name: 'Dashboard',
      route: '/student/dashboard',
      image: 'assets/images/grid.png',
    },
    {
      name: 'Profile',
      route: '/student/profile',
      image: 'assets/images/user.png',
    },
    {
      name: 'News',
      route: '/student/news',
      image: 'assets/images/book-open.png',
    },
    {
      name: 'Settings',
      route: '/student/settings',
      image: 'assets/images/settings.png',
    },
  ];

  constructor(private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
  }
}
