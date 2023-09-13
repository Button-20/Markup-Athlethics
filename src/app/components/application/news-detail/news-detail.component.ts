import { Component, Input } from '@angular/core';
import { News } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent {
  @Input() ngStyle: { [key: string]: string } | undefined;

  @Input() displayGoBack: boolean = true;

  @Input() news: News | any;

  @Input() moreNews: News[] = [];

  constructor(public globals: GlobalsService) {}
}
