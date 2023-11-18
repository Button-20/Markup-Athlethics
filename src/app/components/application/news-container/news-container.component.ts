import { Component, EventEmitter, Input, Output } from '@angular/core';
import { News } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {
  @Input() ngStyle: { [key: string]: string } = {};

  @Input() center: boolean = false;

  @Input() baseLink: string = '/news';

  @Input() news: News[] = [];

  @Input() noScaleAnimation: boolean = false;

  @Output() deleteNews: EventEmitter<string> = new EventEmitter<string>();

  constructor(private globals: GlobalsService) {
    globals.reuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {}
}
