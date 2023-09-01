import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ComponentsModule
  ]
})
export class NewsModule { }
