import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/api/news/news.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent {
  slug: string = '';

  constructor(public newsService: NewsService, public globals: GlobalsService) {
    this.slug = globals.router.url.split('/').pop() as any;
  }

  async ngOnInit() {
    await this.newsService.getNewsBySlug(this.slug);
  }

  async onSubmit(event: any) {
    await this.newsService.postNews(event);
    this.globals.router.navigate(['/admin/news']);
  }
}
