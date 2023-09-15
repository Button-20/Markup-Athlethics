import { Component, Input } from '@angular/core';
import { Faqs } from 'src/app/services/core/IApp';

@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  @Input() faqs: Array<Faqs> = [];
}
