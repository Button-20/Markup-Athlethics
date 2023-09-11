import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataComponent } from './account-data/account-data.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SettingsComponent } from './settings.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: AccountDataComponent,
      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent,
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
      },
      {
        path: 'deactivate-account',
        component: DeactivateAccountComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
