import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
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
import { UpdatePasswordFormComponent } from './forms/update-password-form/update-password-form.component';
import { DashboardNavbarComponent } from './ui/dashboard-navbar/dashboard-navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { NoDataComponent } from './ui/no-data/no-data.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
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
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    NgxIntlTelephoneInputModule,
    ReactiveFormsModule,
  ],
  exports: components,
})
export class ComponentsModule {}
