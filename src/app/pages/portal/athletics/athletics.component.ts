import { Component } from '@angular/core';
import { CoachesService } from 'src/app/services/api/coaches/coaches.service';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-athletics',
  templateUrl: './athletics.component.html',
  styleUrls: ['./athletics.component.scss'],
})
export class AthleticsComponent {
  categories = ['All Categories'];

  constructor(
    public studentsService: StudentsService,
    public coachesService: CoachesService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    await this.studentsService.getSportsData();
    await this.studentsService.getStudentProfiles();
    this.categories = [
      ...this.categories,
      ...this.studentsService.sports.map((sport: any) => sport.sport_name),
    ];
  }

  async search(searchForm: any) {
    this.studentsService.getStudentProfiles();
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

  async viewProfileCount(athlete_id: string) {
    await this.coachesService.postViews(
      athlete_id,
      this.globals.user?.id.toString() || ''
    );
  }

  async filterByCategory(category: string) {
    this.studentsService.studentsQuery.category = category;
    await this.studentsService.getStudentProfiles();
  }
}
