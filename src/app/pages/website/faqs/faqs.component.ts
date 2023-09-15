import { Component } from '@angular/core';
import { FaqsService } from 'src/app/services/api/faqs/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  constructor(public faqsService: FaqsService) { }
  
  async ngOnInit() {
    await this.faqsService.getFaqs();
  }
}
