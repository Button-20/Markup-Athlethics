import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentPortalComponent } from './student-portal.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPortalComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ],
  },
  {
    path: 'complete-profile',
    loadChildren: () =>
      import('./complete-profile/complete-profile.module').then(
        (m) => m.CompleteProfileModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPortalRoutingModule {}
