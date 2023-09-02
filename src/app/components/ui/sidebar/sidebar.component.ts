import { Component } from '@angular/core';

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
}
