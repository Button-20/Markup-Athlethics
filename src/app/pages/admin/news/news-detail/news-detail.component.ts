import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/api/news/news.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent {
  slug: string = '';

  constructor(public newsService: NewsService, public globals: GlobalsService) {
    this.slug = globals.router.url.split('/').pop() as any;
  }

  async ngOnInit() {
    await this.newsService.getNewsBySlug(this.slug);
    await this.newsService.getNews();
  }
}
