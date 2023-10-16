import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/api/news/news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent {
  constructor(public newsService: NewsService) {}

  async onSubmit(event: any) {
    console.log(event);
  }
}
