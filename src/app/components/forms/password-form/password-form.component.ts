import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent {
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() firstInputLabel: string = 'Password';
  @Input() secondInputLabel: string = 'Confirm Password';
  @Input() submitButtonLabel: string = 'Sign up';

  passwordForm: FormGroup = new FormGroup(
    {
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

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(public globals: GlobalsService) {}

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.globals.toast.error('Please fill the form correctly');
      return;
    }
    let registrationDetails =
      this.globals.storage.getRegistrationDetails() || {};
    registrationDetails = {
      ...registrationDetails,
      ...this.passwordForm.value,
    };

    this.submitForm.emit(registrationDetails);
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

  get password_confirmation() {
    return this.passwordForm.get('password_confirmation') as FormControl;
  }
}
