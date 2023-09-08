import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { ImageUploadsComponent } from './image-uploads/image-uploads.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { ProfileComponent } from './profile.component';
import { VideoUploadsComponent } from './video-uploads/video-uploads.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
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
        path: '**',
        redirectTo: '',
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
export class ProfileRoutingModule {}
