import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'account-data-form',
  templateUrl: './account-data-form.component.html',
  styleUrls: ['./account-data-form.component.scss'],
})
export class AccountDataFormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  accountForm: FormGroup = new FormGroup({
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

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}

  async submit() {
    if (this.accountForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.accountForm.value);
  }

  onPhoneNumberChange(event: any) {
    this.accountForm.patchValue({
      phone: '+' + event.dialCode + ' ' + event.phoneNumber,
    });
  }

  get name() {
    return this.accountForm.get('name') as FormControl;
  }

  get institution_name() {
    return this.accountForm.get('institution_name') as FormControl;
  }

  get email() {
    return this.accountForm.get('email') as FormControl;
  }

  get country() {
    return this.accountForm.get('country') as FormControl;
  }

  get phone() {
    return this.accountForm.get('phone') as FormControl;
  }
}
