import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
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
      name: 'News And Articles',
      route: '/news',
    },
    {
      name: 'Terms of Use',
      route: '/terms-of-use',
    },
    { name: 'Privacy Policy', route: '/terms-of-use' },
  ];
}
