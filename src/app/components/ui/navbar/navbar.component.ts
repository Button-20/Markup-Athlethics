import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navigations: { name: string; route: string }[] = [
    {
      name: 'Home',
      route: '/home',
    },
    {
      name: 'About Us',
      route: '/about-us',
    },
    {
      name: 'Contact Us',
      route: '/contact-us',
    },
    {
      name: 'Categories',
      route: '/categories',
    },
    {
      name: "FAQ's",
      route: '/faqs',
    },
    {
      name: 'News',
      route: '/news',
    },
  ];

  ngOnInit() {
    this.initNavbar();
  }

  initNavbar() {
    const searchIcon = document.querySelector('#search') as HTMLElement;
    const searchContainer = document.querySelector(
      '#search-container'
    ) as HTMLInputElement;
    const menuIcon = document.querySelector('#mobile-menu') as HTMLElement;
    const menu = document.querySelector('.mobile-menu') as HTMLElement;
    const closeIcon = document.querySelector('#close-menu') as HTMLElement;

    // Add event listener to search icon
    searchIcon.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      searchContainer.focus();
    });

    // close search container when click outside
    searchContainer.addEventListener('blur', () => {
      searchContainer.classList.remove('active');
    });

    // Add event listener to menu icon
    menuIcon.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // Add event listener to close icon
    closeIcon.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  }
}
