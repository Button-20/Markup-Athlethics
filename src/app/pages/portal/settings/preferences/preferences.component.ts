import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/api/users/users.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  constructor(
    public usersService: UsersService,
    public globals: GlobalsService
  ) {}

  async updatePreferences(event: any) {
    let preferences_name = event.target.name;
    let preferences_value = event.target.checked;
    if (this.globals.user) {
      if (preferences_name === 'all_notifications') {
        this.globals.user.preferences[0].all_notifications = preferences_value;
      } else if (preferences_name === 'profile_visits') {
        this.globals.user.preferences[1].profile_visits = preferences_value;
      } else if (preferences_name === 'connection_requests') {
        this.globals.user.preferences[2].connection_requests =
          preferences_value;
      }
    }

    await this.usersService.updateUserProfile(
      this.globals.user || {},
      this.globals.user?.slug || ''
    );
    this.globals.toast.success('Preferences updated successfully!');
  }
}
