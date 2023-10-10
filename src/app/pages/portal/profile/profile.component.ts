import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  navigations: {
    name: string;
    route: string;
  }[] = [
    {
      name: 'Personal Data (Bio)',
      route: '',
    },
    {
      name: 'Educational Background',
      route: '/educational-background',
    },
    {
      name: 'Athletic Background',
      route: '/athletic-background',
    },
    {
      name: 'Image uploads',
      route: '/image-uploads',
    },
    {
      name: 'Video uploads',
      route: '/video-uploads',
    },
  ];

  currentNav: { name: string; route: string } = { name: '', route: '' };
  subscription: any;
  constructor(public globals: GlobalsService, public studentsService: StudentsService){
    this.subscription = this.globals.router.events.subscribe((event) => {
      this.currentNav = this.navigations.find(
        (nav) =>
          nav.route.replace('/', '') ===
          (this.globals.router.url.split('/')[3] || '')
      ) || { name: '', route: '' };
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
