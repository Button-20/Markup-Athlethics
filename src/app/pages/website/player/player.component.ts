import { Component } from '@angular/core';
import { CoachesService } from 'src/app/services/api/coaches/coaches.service';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  student_id: string = '';

  constructor(
    public globals: GlobalsService,
    public studentsService: StudentsService,
    public coachesService: CoachesService
  ) {
    this.student_id = this.globals.router.url.split('/')[2];
  }

  async ngOnInit() {
    await this.studentsService.getStudentProfile(this.student_id);
  }

  ngOnDestroy() {
    this.studentsService.student = null;
  }
}
