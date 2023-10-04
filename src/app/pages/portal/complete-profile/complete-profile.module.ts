import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfileComponent } from './complete-profile.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { ImageUploadsComponent } from './image-uploads/image-uploads.component';
import { ProfileCompleteComponent } from './profile-complete/profile-complete.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { VideoUploadsComponent } from './video-uploads/video-uploads.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    CompleteProfileComponent,
    ProfileDataComponent,
    EducationalBackgroundComponent,
    AthleticBackgroundComponent,
    ImageUploadsComponent,
    VideoUploadsComponent,
    ProfileCompleteComponent,
  ],
  imports: [CommonModule, CompleteProfileRoutingModule, ReactiveFormsModule, ComponentsModule],
})
export class CompleteProfileModule {}
