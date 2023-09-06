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

  mobileNavigations: { name: string; route: string }[] = [
    ...this.navigations,
    {
      name: 'Terms of Use',
      route: '/terms-of-use',
    },
    { name: 'Privacy Policy', route: '/terms-of-use' },
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
    const menuItems = document.querySelectorAll('.mobile-menu-items a');

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
    menuItems.forEach((menuItem) => {
      closeIcon.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }

  closeMenu() {
    const menu = document.querySelector('.mobile-menu') as HTMLElement;
    menu.classList.remove('active');
  }
}
