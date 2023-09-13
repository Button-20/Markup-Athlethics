import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pagination = {
    current_page: 1,
    per_page: 10,
    last_page: 0,
  };

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onPageChange(page: any): void {
    if (
      page >= 1 &&
      page <= this.pagination.last_page &&
      page !== this.pagination.current_page
    ) {
      this.pagination.current_page = page;
      this.pageChanged.emit(this.pagination.current_page);
    }
  }

  getPagesArray(): (number | string)[] {
    const pagesToShow = 5; // Number of pages to show in the pagination bar
    const pages: (number | string)[] = [];
    const totalPages = this.pagination.last_page;

    let startPage: number;
    let endPage: number;

    // Case 1: If total pages are less than or equal to the number of pages to show,
    // display all pages
    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    }
    // Case 2: If the current page is close to the start of the pagination bar
    else if (this.pagination.current_page <= Math.ceil(pagesToShow / 2)) {
      startPage = 1;
      endPage = pagesToShow;
    }
    // Case 3: If the current page is close to the end of the pagination bar
    else if (
      this.pagination.current_page + Math.floor(pagesToShow / 2) >=
      totalPages
    ) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    }
    // Case 4: If the current page is in the middle of the pagination bar
    else {
      startPage = this.pagination.current_page - Math.floor(pagesToShow / 2);
      endPage = this.pagination.current_page + Math.floor(pagesToShow / 2);
    }

    // Generate the array of page numbers to display
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and adjust startPage if necessary
    if (startPage > 2) {
      pages.unshift('...');
      pages.unshift(1);
    } else if (startPage === 2) {
      pages.unshift(startPage - 1);
    }

    // Add ellipsis and adjust endPage if necessary
    if (endPage < totalPages - 1) {
      pages.push('...');
      pages.push(totalPages);
    } else if (endPage === totalPages - 1) {
      pages.push(endPage + 1);
    }

    return pages;
  }

  pageType(page: any): string {
    return typeof page;
  }
}
