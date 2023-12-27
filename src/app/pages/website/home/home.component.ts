import { Component } from '@angular/core';
import { FaqsService } from 'src/app/services/api/faqs/faqs.service';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  carouselArray: Array<any> = [];

  constructor(
    private globals: GlobalsService,
    public faqsService: FaqsService,
    public studentsService: StudentsService
  ) {}

  async ngOnInit() {
    await this.faqsService.getFaqs();
    await this.studentsService.getStudentProfiles();
    console.log(this.studentsService.students);
       this.carouselArray = [
         ...Array(Math.ceil(this.studentsService.students.length / 3)),
       ];
    console.log(this.carouselArray);
  }
}
