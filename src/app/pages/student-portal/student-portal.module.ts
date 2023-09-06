import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentPortalRoutingModule } from './student-portal-routing.module';
import { StudentPortalComponent } from './student-portal.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [DashboardComponent, StudentPortalComponent, ProfileComponent, SettingsComponent, NewsComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    StudentPortalRoutingModule,
    ServicesModule,
  ],
})
export class StudentPortalModule {}
