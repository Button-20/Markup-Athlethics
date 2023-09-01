import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqsComponent } from './application/faqs/faqs.component';
import { NewsContainerComponent } from './application/news-container/news-container.component';
import { PlayerCardComponent } from './application/player-card/player-card.component';
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
];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule],
  exports: components,
})
export class ComponentsModule {}
