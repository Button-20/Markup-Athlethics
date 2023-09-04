import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    institution: new FormControl('', [Validators.required]),
    institution_email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    region: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  constructor(
    private globals: GlobalsService
  ) {}

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.globals.toast.error('Please fill the form correctly');
      return;
    }
    this.signupForm.value.phone =
      this.signupForm.value.phone.internationalNumber;
    this.globals.storage.setRegistrationDetails(this.signupForm.value);
  }

  get fullname() {
    return this.signupForm.get('fullname') as FormControl;
  }

  get institution() {
    return this.signupForm.get('institution') as FormControl;
  }

  get institution_email() {
    return this.signupForm.get('institution_email') as FormControl;
  }
}
