import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  token: string = '';

  constructor(
    private authService: AuthService,
    private globals: GlobalsService
  ) {
    this.token = this.globals.router.url.split('/').pop() || '';
  }

  async onSubmit(event: any) {
    event.token = this.token;
    await this.authService.resetPassword(event);
  }
}
