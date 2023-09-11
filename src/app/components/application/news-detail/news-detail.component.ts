import { Component, Input } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent {
  @Input() ngStyle: { [key: string]: string } | undefined;

  @Input() displayGoBack: boolean = true;

  constructor(public globals: GlobalsService) {}
}
