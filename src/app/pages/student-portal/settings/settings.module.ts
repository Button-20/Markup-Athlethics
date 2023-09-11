import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { AccountDataComponent } from './account-data/account-data.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';


@NgModule({
  declarations: [SettingsComponent, AccountDataComponent, UpdatePasswordComponent, PreferencesComponent, DeactivateAccountComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule, RouterModule
  ]
})
export class SettingsModule { }
