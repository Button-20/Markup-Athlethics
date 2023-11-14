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

  toggleDropdown(event: any) {
    let dropdown = event.target.nextElementSibling;

    // close all dropdowns except the one that was clicked
    let dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove('show');
      }
    });
    dropdown?.classList.toggle('show');

    // close dropdowns when clicking outside
    window.onmousedown = (event: any) => {
      if (!event.target.contains('dropdown-menu')) {
        dropdown?.classList.remove('show');
      }
    };
  }

  closeDropdown(event: any) {
    let dropdown = event.target.parentElement;
    dropdown.classList.remove('show');
  }

  async suspendStudent(event: any, id: number) {
    event.preventDefault();
    await this.studentsService.suspendStudent(id);
  }
}
