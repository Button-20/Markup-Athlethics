import { Component } from '@angular/core';
import { FaqsService } from 'src/app/services/api/faqs/faqs.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private globals: GlobalsService, public faqsService: FaqsService) {}

  async ngOnInit() {
    await this.faqsService.getFaqs();
  }
}
