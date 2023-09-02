import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { FaqsComponent } from './application/faqs/faqs.component';
import { NewsContainerComponent } from './application/news-container/news-container.component';
import { PlayerCardComponent } from './application/player-card/player-card.component';
import { ContactFormComponent } from './forms/contact-form/contact-form.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { SocialsHangingComponent } from './ui/socials-hanging/socials-hanging.component';

const components: Array<any> = [
  NavbarComponent,
  FooterComponent,
  SocialsHangingComponent,
  FaqsComponent,
  PlayerCardComponent,
  NewsContainerComponent,
  ContactFormComponent,
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
