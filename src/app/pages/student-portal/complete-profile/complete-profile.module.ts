import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfileComponent } from './complete-profile.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';


@NgModule({
  declarations: [
    CompleteProfileComponent,
    ProfileDataComponent
  ],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule
  ]
})
export class CompleteProfileModule { }
