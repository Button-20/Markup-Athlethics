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
  email: string = '';

  constructor(
    private authService: AuthService,
    public globals: GlobalsService
  ) {
    this.token = this.globals.router.url.split('/').pop() || '';
    this.email = this.globals.activatedRoute.snapshot.queryParams?.['email'] || '';
  }

  async onSubmit(event: any) {
    event.token = this.token;
    event.email = this.email;
    await this.authService.resetPassword(event);
    this.globals.router.navigate(['/auth/password-reset-success']);
  }
}
