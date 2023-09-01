import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    WebsiteComponent,
    CategoriesComponent,
    FaqsComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
})
export class WebsiteModule {}
