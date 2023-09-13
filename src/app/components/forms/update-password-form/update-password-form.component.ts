import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss'],
})
export class UpdatePasswordFormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  passwordForm: FormGroup = new FormGroup(
    {
      old_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        ),
      ]),
      password_confirmation: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator(
        'password',
        'password_confirmation'
      ),
    }
  );

  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  constructor() {}

  async submit() {
    this.onSubmit.emit(this.passwordForm.value);
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

  get old_password() {
    return this.passwordForm.get('old_password') as FormControl;
  }

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  get password_confirmation() {
    return this.passwordForm.get('password_confirmation') as FormControl;
  }
}
