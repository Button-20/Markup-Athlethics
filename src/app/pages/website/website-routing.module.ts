import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about-us',
        component: AboutComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'player/:id',
        component: PlayerComponent,
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'terms-of-use',
        component: TermsOfUseComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
