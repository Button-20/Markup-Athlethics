import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    min_age: new FormControl(''),
    max_age: new FormControl(''),
    min_height: new FormControl(''),
    max_height: new FormControl(''),
    min_gpa: new FormControl(''),
    max_gpa: new FormControl(''),
    gender: new FormControl(''),
    educational_level: new FormControl(''),
  });

  constructor(public globals: GlobalsService) {}

  onSubmit() {
    this.search.emit(this.searchForm.value);
    this.searchForm.reset({
      name: '',
      country: '',
      min_age: '',
      max_age: '',
      min_height: '',
      max_height: '',
      min_gpa: '',
      max_gpa: '',
      educational_level: '',
    });
    this.toggleSearch();
  }

  toggleSearchFilter(event: any) {
    event.preventDefault();
    this.toggleSearch();
  }

  toggleSearch() {
    let searchFilter = document.querySelector('.search-filter');
    searchFilter?.classList.toggle('show');
    document.addEventListener('mousedown', (e: any) => {
      if (!e?.target?.closest('.search-filter-container')) {
        searchFilter?.classList.remove('show');
      }
    });
  }

  toggleDropdown(event: any) {
    event.preventDefault();
    let dropdown = event.target.closest('.select');
    dropdown?.classList.toggle('show');
    document.addEventListener('mousedown', (e: any) => {
      if (!e?.target?.closest('.select')) {
        dropdown?.classList.remove('show');
      }
    });
  }

  selectCountry(country: string) {
    this.searchForm.controls['country'].setValue(country);
  }

  onUserChange({ min, max }: { min: number; max: number }, input: string) {
    console.log(min, max);
    this.searchForm.controls[`min_${input}`].setValue(min);
    this.searchForm.controls[`max_${input}`].setValue(max);
  }
}
