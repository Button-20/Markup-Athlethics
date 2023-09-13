import { Component, Input } from '@angular/core';
import { News } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {
  @Input() ngStyle: { [key: string]: string } = {};

  @Input() baseLink: string = '/news';

  @Input() news: News[] = [];

  constructor(private globals: GlobalsService) {
    globals.reuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {}
}
