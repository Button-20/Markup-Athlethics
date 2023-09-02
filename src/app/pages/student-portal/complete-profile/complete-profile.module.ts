import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfileComponent } from './complete-profile.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { AthleticBackgroundComponent } from './athletic-background/athletic-background.component';

@NgModule({
  declarations: [CompleteProfileComponent, ProfileDataComponent, EducationalBackgroundComponent, AthleticBackgroundComponent],
  imports: [CommonModule, CompleteProfileRoutingModule, ReactiveFormsModule],
})
export class CompleteProfileModule {}
