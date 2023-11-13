import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss'],
})
export class AthletesComponent {
  constructor(
    public studentsService: StudentsService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    await this.studentsService.getSportsData();
    await this.studentsService.getStudentProfiles();
  }
}
