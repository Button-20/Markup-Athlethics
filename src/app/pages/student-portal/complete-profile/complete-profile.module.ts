import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfileComponent } from './complete-profile.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { ImageUploadsComponent } from './image-uploads/image-uploads.component';
import { VideoUploadsComponent } from './video-uploads/video-uploads.component';

@NgModule({
  declarations: [CompleteProfileComponent, ProfileDataComponent, EducationalBackgroundComponent, AthleticBackgroundComponent, ImageUploadsComponent, VideoUploadsComponent],
  imports: [CommonModule, CompleteProfileRoutingModule, ReactiveFormsModule],
})
export class CompleteProfileModule {}
