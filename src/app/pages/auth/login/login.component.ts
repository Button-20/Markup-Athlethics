import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    institution_email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  showPassword: boolean = false;

  constructor(private authService: AuthService) {}

  async onSubmit() {
    await this.authService.login(this.loginForm.value);
  }

  get institution_email() {
    return this.loginForm.get('institution_email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
