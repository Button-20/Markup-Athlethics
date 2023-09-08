import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { ImageUploadsComponent } from './image-uploads/image-uploads.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { VideoUploadsComponent } from './video-uploads/video-uploads.component';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileDataComponent,
    EducationalBackgroundComponent,
    AthleticBackgroundComponent,
    ImageUploadsComponent,
    VideoUploadsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    NgxIntlTelephoneInputModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule {}
