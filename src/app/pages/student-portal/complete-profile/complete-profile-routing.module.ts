import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile.component';
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
