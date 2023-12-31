import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { CompleteProfileComponent } from './complete-profile.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { ImageUploadsComponent } from './image-uploads/image-uploads.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { VideoUploadsComponent } from './video-uploads/video-uploads.component';
import { ProfileCompleteComponent } from './profile-complete/profile-complete.component';

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
        path: 'image-uploads',
        component: ImageUploadsComponent,
      },
      {
        path: 'video-uploads',
        component: VideoUploadsComponent,
      },

      {
        path: '',
        redirectTo: 'profile-data',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'profile-complete',
    component: ProfileCompleteComponent,
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
