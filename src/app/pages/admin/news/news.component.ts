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

  ngOnDestroy() {
    this.newsService.news = [];
  }
}
