import { Component, Input } from '@angular/core';

@Component({
  selector: 'news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {
  @Input() slice: number = 10;

  @Input() ngStyle: { [key: string]: string } = {};

  @Input() baseLink: string = '/news';

  constructor() {}

  ngOnInit() {}
}
