import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [CommonModule, NewsRoutingModule, ComponentsModule],
})
export class NewsModule {}
