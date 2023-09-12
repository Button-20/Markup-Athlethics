import { Component, Input } from '@angular/core';
import { News } from 'src/app/services/core/IApp';

@Component({
  selector: 'news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {
  @Input() slice: number = 10;

  @Input() ngStyle: { [key: string]: string } = {};

  @Input() baseLink: string = '/news';

  @Input() news: News[] = [];

  constructor() {}

  ngOnInit() {}
}
