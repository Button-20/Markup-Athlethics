import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, key: string[]): any[] {
    if (!items) return [];
    if (!searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      for (let i = 0; i < key.length; i++) {
        if (item[key[i]].toLowerCase().includes(searchTerm)) {
          return true;
        }
      }

      return false;
    });
  }
}
