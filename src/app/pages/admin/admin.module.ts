import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [ComponentsModule, ServicesModule, CommonModule, AdminRoutingModule],
})
export class AdminModule {}
