import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [ApprovalsComponent, PlayerComponent],
  imports: [CommonModule, ApprovalsRoutingModule, ComponentsModule],
})
export class ApprovalsModule {}
