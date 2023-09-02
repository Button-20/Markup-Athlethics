import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { CompleteProfileComponent } from './complete-profile.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteProfileComponent,
    children: [
      {
        path: 'profile-data',
        component: ProfileDataComponent,
      },
      {
        path: 'educational-background',
        component: EducationalBackgroundComponent,
      },
      {
        path: 'athletic-background',
        component: AthleticBackgroundComponent,
      },
      {
        path: '',
        redirectTo: 'profile-data',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteProfileRoutingModule {}
