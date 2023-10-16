import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/api/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  constructor(public newsService: NewsService) {}

  async ngOnInit() {
    await this.newsService.getNews();
  }

  async deleteNews(slug: string) {
    if (confirm('Are you sure you want to delete this news?')) {
      await this.newsService.deleteNews(slug);
      await this.newsService.getNews();
    }
  }

  ngOnDestroy() {
    this.newsService.news = [];
  }
}
