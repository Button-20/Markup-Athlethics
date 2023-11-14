import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminsComponent } from './admins/admins.component';
import { AthletesComponent } from './athletes/athletes.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'connections',
        component: ConnectionsComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'coaches',
        component: CoachesComponent,
      },
      {
        path: 'athletes',
        component: AthletesComponent,
      },
      {
        path: 'approvals',
        loadChildren: () => import('./approvals/approvals.module').then(m => m.ApprovalsModule)
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
