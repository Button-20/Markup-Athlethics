import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConnectionsComponent } from './connections/connections.component';
import { AdminsComponent } from './admins/admins.component';
import { AthletesModule } from './athletes/athletes.module';
import { CoachesComponent } from './coaches/coaches.component';
import { ApprovalsComponent } from './approvals/approvals.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ConnectionsComponent, AdminsComponent, CoachesComponent, ApprovalsComponent],
  imports: [AthletesModule, ComponentsModule, ServicesModule, CommonModule, AdminRoutingModule],
})
export class AdminModule {}
