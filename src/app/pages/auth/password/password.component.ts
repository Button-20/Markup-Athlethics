import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  passwordForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator('password', 'confirmPassword') }
  );

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private globals: GlobalsService
  ) {}

  async onSubmit() {
    if (this.passwordForm.invalid) {
      this.globals.toast.error('Please fill the form correctly');
      return;
    }
    let registrationDetails = this.globals.storage.getRegistrationDetails();
    registrationDetails = {
      ...registrationDetails,
      ...this.passwordForm.value,
    };
    await this.authService.register(registrationDetails);
  }

  passwordMatchValidator(password: string, confirmPassword: string): any {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors?.['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }
}
