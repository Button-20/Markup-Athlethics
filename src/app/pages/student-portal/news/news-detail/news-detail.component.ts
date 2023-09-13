import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/api/news/news.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent {
  id: number = 0;

  constructor(public newsService: NewsService, public globals: GlobalsService) {
    this.id = globals.router.url.split('/').pop() as any;
  }

  async ngOnInit() {
    await this.newsService.getNewsById(this.id);
    await this.newsService.getNews();
  }
}
