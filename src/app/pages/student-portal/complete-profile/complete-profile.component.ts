import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent {
  steps: {
    name: string;
    description: string;
    route: string;
    progress: number;
  }[] = [
    {
      name: 'Personal Data (Bio)',
      description: 'Enter personal details like your age and height',
      route: 'profile-data',
      progress: 20,
    },
    {
      name: 'Educational Background',
      description: 'Fill in with details about your education',
      route: 'educational-background',
      progress: 40,
    },
    {
      name: 'Athletic Background',
      description: 'Fill in with details about the category of sports you play',
      route: 'athletic-background',
      progress: 60,
    },
    {
      name: 'Image uploads',
      description: 'Upload athletic profile images',
      route: 'image-uploads',
      progress: 80,
    },
    {
      name: 'Video uploads',
      description: 'Upload tryout videos',
      route: 'video-uploads',
      progress: 100,
    },
  ];

  progress: number = 0;

  constructor(public globals: GlobalsService) {
    this.progress =
      this.globals.router.url.split('/')[
        this.globals.router.url.split('/').length - 1
      ] === 'profile-data'
        ? 20
        : this.globals.router.url.split('/')[
            this.globals.router.url.split('/').length - 1
          ] === 'educational-background'
        ? 40
        : this.globals.router.url.split('/')[
            this.globals.router.url.split('/').length - 1
          ] === 'athletic-background'
        ? 60
        : this.globals.router.url.split('/')[
            this.globals.router.url.split('/').length - 1
          ] === 'image-uploads'
        ? 80
        : this.globals.router.url.split('/')[
            this.globals.router.url.split('/').length - 1
          ] === 'video-uploads'
        ? 100
        : 0;
  }


}
