import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  constructor(
    public authService: AuthService,
    public globals: GlobalsService
  ) {}

  async onSubmit(event: any) {
    await this.authService.updatePassword(event);
    this.globals.toast.success('🎉 Password updated successfully!');
  }
}
