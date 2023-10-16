import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { FormsModule } from '@angular/forms';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsFormComponent } from './news-form/news-form.component';

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent, NewsFormComponent],
  imports: [ServicesModule, ComponentsModule, CommonModule, NewsRoutingModule, FormsModule],
})
export class NewsModule {}
