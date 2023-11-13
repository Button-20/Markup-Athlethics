import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent {
  constructor(
    public studentsService: StudentsService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    await this.studentsService.getStudentsPendingApproval();
  }

  ngOnDestroy() {
    this.studentsService.students = [];
  }
}
