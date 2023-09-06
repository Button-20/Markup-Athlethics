import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService) {}

  async onSubmit() {
    await this.authService.forgotPassword(this.resetForm.value);
  }

  get email() {
    return this.resetForm.get('email') as FormControl;
  }
}
