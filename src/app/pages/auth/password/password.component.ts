import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {

  constructor(
    private authService: AuthService,
    private globals: GlobalsService
  ) {}

  async onSubmit(event: any) {
    await this.authService.register(event);
    this.globals.storage.clearRegistrationDetails();
    this.globals.router.navigate(['/student/dashboard']);
  }
}
