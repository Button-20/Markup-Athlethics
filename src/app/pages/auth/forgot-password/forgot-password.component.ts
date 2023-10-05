import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService, public globals: GlobalsService) {}

  async onSubmit() {
    await this.authService.forgotPassword(this.resetForm.value);
    this.resetForm.reset({
      email: '',
    });
  }

  get email() {
    return this.resetForm.get('email') as FormControl;
  }
}
