import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss'],
})
export class DashboardNavbarComponent {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() sidebarOpened: boolean = false;

  constructor(public globals: GlobalsService) {}

  toggleNotification() {
    let notificationMenu = document.getElementById('notification-menu');
    let notificationIcon = document.getElementById('notification-icon');
    notificationIcon?.classList.toggle('img-success');
    notificationMenu?.classList.toggle('active');
  }

  toggleMenu() {
    let menuIcon = document.getElementById('menu-icon');
    menuIcon?.classList.toggle('img-success');
  }
}
