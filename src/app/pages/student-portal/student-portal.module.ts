import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentPortalRoutingModule } from './student-portal-routing.module';
import { StudentPortalComponent } from './student-portal.component';

@NgModule({
  declarations: [DashboardComponent, StudentPortalComponent],
  imports: [ComponentsModule, CommonModule, StudentPortalRoutingModule],
})
export class StudentPortalModule {}
