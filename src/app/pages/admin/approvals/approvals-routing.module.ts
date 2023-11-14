import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsComponent } from './approvals.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsComponent,
  },
  {
    path: 'player/:id',
    component: PlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsRoutingModule {}
