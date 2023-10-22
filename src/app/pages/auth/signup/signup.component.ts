import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    institution_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    status: new FormControl('1'),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  constructor(public globals: GlobalsService) {
    this.globals.activatedRoute.queryParams.subscribe((params) => {
      if (params['userType']) {
        this.signupForm.patchValue({
          status: params['userType'] === 'student' ? '1' : '2',
        });
      }
    });
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.globals.toast.error('Please fill the form correctly');
      return;
    }
    this.globals.storage.setRegistrationDetails(this.signupForm.value);
    this.globals.router.navigate(['/auth/password']);
  }

  onPhoneNumberChange(event: any) {
    this.signupForm.patchValue({
      phone: '+' + event.dialCode + ' ' + event.phoneNumber,
    });
  }

  get name() {
    return this.signupForm.get('name') as FormControl;
  }

  get institution_name() {
    return this.signupForm.get('institution_name') as FormControl;
  }

  get email() {
    return this.signupForm.get('email') as FormControl;
  }

  get country() {
    return this.signupForm.get('country') as FormControl;
  }
}
