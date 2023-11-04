import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { UsersService } from 'src/app/services/api/users/users.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    public globals: GlobalsService,
    public usersService: UsersService,
    public studentsService: StudentsService
  ) {}

  async ngOnInit() {
    await this.usersService.getUserProfile();
    if (this.globals.user?.user_type === '2') {
      this.studentsService.studentsQuery.type = 'featured';
      await this.studentsService.getStudentProfiles();
    }
  }

  ngOnDestroy() {
    this.studentsService.studentsQuery.type = '';
    this.studentsService.students = [];
  }

  ngAfterViewInit() {
    this.startProgressBar();
    this.startProgressCircle();
  }

  get calculatePercentage(): number {
    let percentage = 0;

    if (this.globals.user?.user_progress?.videos_completed === 1) {
      percentage += 20;
    }

    if (this.globals.user?.user_progress?.images_completed === 1) {
      percentage += 20;
    }

    if (this.globals.user?.user_progress?.personal_data_completed === 1) {
      percentage += 20;
    }

    if (this.globals.user?.user_progress?.athletic_background_completed === 1) {
      percentage += 20;
    }

    if (
      this.globals.user?.user_progress?.educational_background_completed === 1
    ) {
      percentage += 20;
    }
    return percentage;
  }

  navigateToCompleteProfile() {
    this.globals.user?.user_progress?.educational_background_completed === 0
      ? this.globals.router.navigate([
          '/portal/complete-profile/educational-background',
        ])
      : this.globals.user?.user_progress?.athletic_background_completed === 0
      ? this.globals.router.navigate([
          '/portal/complete-profile/athletic-background',
        ])
      : this.globals.user?.user_progress?.images_completed === 0
      ? this.globals.router.navigate(['/portal/complete-profile/image-uploads'])
      : this.globals.user?.user_progress?.videos_completed === 0
      ? this.globals.router.navigate(['/portal/complete-profile/video-uploads'])
      : this.globals.router.navigate(['/portal/complete-profile']);
  }

  startProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (bar) {
      bar.style.setProperty('--width', `${this.calculatePercentage}%`);
    }
  }

  startProgressCircle() {
    const circle = document.getElementById('progress-circle');
    let degrees = 0;
    let count = 0;
    degrees = (this.calculatePercentage * 360) / 100;
    const interval = setInterval(() => {
      if (count === degrees) {
        clearInterval(interval);
      } else {
        count++;
        if (circle) circle.style.setProperty('--percentage', `${count}deg`);
      }
    }, 10);
  }
}
