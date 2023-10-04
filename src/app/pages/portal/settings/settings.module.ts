import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { AccountDataComponent } from './account-data/account-data.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountDataComponent,
    UpdatePasswordComponent,
    PreferencesComponent,
    DeactivateAccountComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, RouterModule, ComponentsModule],
})
export class SettingsModule {}
