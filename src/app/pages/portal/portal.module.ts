import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { ProfileComponent } from './profile/profile.component';
import { ConnectionsComponent } from './connections/connections.component';
import { AthleticsComponent } from './athletics/athletics.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PortalComponent,
    ProfileComponent,
    NotFoundComponent,
    ConnectionsComponent,
    AthleticsComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    PortalRoutingModule,
    ServicesModule,
  ],
})
export class PortalModule {}
