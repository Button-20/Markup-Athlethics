import { Component } from '@angular/core';

@Component({
  selector: 'app-athletics',
  templateUrl: './athletics.component.html',
  styleUrls: ['./athletics.component.scss'],
})
export class AthleticsComponent {
  categories = ['All Categories', 'Soccer', 'Track and Field', 'Basketball'];
  activeTab: string = 'All Categories';

  constructor() {}

  toggleSearchFilter() {
    let searchFilter = document.querySelector('.search-filter');
    searchFilter?.classList.toggle('show');
    document.addEventListener('mousedown', (e: any) => {
      if (!e?.target?.closest('.search-filter-container')) {
        searchFilter?.classList.remove('show');
      }
    });
  }
}
