import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { DateAsAgoPipe } from '../services/pipes/dateAsAgo';
import { SearchPipe } from '../services/pipes/search/search.pipe';
import { ServicesModule } from '../services/services.module';
import { ConnectionCardComponent } from './application/connection-card/connection-card.component';
import { FaqsComponent } from './application/faqs/faqs.component';
import { NewsContainerComponent } from './application/news-container/news-container.component';
import { NewsDetailComponent } from './application/news-detail/news-detail.component';
import { NotificationComponent } from './application/notification/notification.component';
import { PlayerCardComponent } from './application/player-card/player-card.component';
import { PlayerProfileComponent } from './application/player-profile/player-profile.component';
import { AccountDataFormComponent } from './forms/account-data-form/account-data-form.component';
import { ArticleFormComponent } from './forms/article-form/article-form.component';
import { ContactFormComponent } from './forms/contact-form/contact-form.component';
import { PasswordFormComponent } from './forms/password-form/password-form.component';
import { SearchFilterComponent } from './forms/search-filter/search-filter.component';
import { UpdatePasswordFormComponent } from './forms/update-password-form/update-password-form.component';
import { DashboardNavbarComponent } from './ui/dashboard-navbar/dashboard-navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { NoDataComponent } from './ui/no-data/no-data.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { RangeSliderComponent } from './ui/range-slider/range-slider.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { SocialsHangingComponent } from './ui/socials-hanging/socials-hanging.component';

const components: Array<any> = [
  NavbarComponent,
  FooterComponent,
  SocialsHangingComponent,
  FaqsComponent,
  PlayerCardComponent,
  NewsContainerComponent,
  ContactFormComponent,
  DashboardNavbarComponent,
  SidebarComponent,
  NoDataComponent,
  PasswordFormComponent,
  PlayerProfileComponent,
  NewsDetailComponent,
  PaginationComponent,
  AccountDataFormComponent,
  UpdatePasswordFormComponent,
  ConnectionCardComponent,
  NotificationComponent,
  ArticleFormComponent,
  SearchFilterComponent,
  RangeSliderComponent,
  DateAsAgoPipe,
  SearchPipe,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    NgxIntlTelephoneInputModule,
    ReactiveFormsModule,
    NgxEditorModule,
    ServicesModule,
    FormsModule,
  ],
  exports: components,
})
export class ComponentsModule {}
