import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories = ['All Categories'];

  constructor(
    public studentsService: StudentsService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    // await this.studentsService.getSportsData();
    // await this.studentsService.getStudentProfiles();
    // this.categories = [
    //   ...this.categories,
    //   ...this.studentsService.sports.map((sport: any) => sport.sport_name),
    // ];
  }

  ngOnDestroy() {
    this.studentsService.students = [];
  }

  async search(searchForm: any) {
    this.studentsService.studentsQuery = {
      ...this.studentsService.studentsQuery,
      ...searchForm,
    };
    await this.studentsService.getStudentProfiles();
  }

  toggleSearchFilter(event: any) {
    event.preventDefault();
    let searchFilter = document.querySelector('.search-filter');
    searchFilter?.classList.toggle('show');
    document.addEventListener('mousedown', (e: any) => {
      if (!e?.target?.closest('.search-filter-container')) {
        searchFilter?.classList.remove('show');
      }
    });
  }

  async filterByCategory(category: string) {
    this.studentsService.studentsQuery.category = category;
    await this.studentsService.getStudentProfiles();
  }
}
