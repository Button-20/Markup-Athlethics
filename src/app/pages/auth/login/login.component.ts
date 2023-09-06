import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private globals: GlobalsService
  ) {}

  async onSubmit() {
    await this.authService.login(this.loginForm.value);
    this.globals.router.navigate(['/student/dashboard']);
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
