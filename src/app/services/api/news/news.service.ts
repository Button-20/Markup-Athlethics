import { Injectable } from '@angular/core';
import { News } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news: News[] = [];

  singleNews: News | any;

  pagination = {
    per_page: 5,
    last_page: 0,
    current_page: 1,
  };

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getNews() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get(
          `posts-data?page=${this.pagination.current_page}`
        );
        this.news = resp.data.data;
        this.pagination.current_page = resp.data.current_page;
        this.pagination.per_page = resp.data.per_page;
        this.pagination.last_page = resp.data.last_page;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  async getNewsById(id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get(`posts-data/${id}`);
        this.singleNews = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }
}
