import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  contactForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  constructor() {}

  emitSubmit() {
    if (this.contactForm.invalid) return;
    this.onSubmit.emit(this.contactForm.value);
  }

  onPhoneNumberChange(event: any) {
    this.contactForm.patchValue({
      phonenumber: event.internationalNumber,
    });
  }

  get fullname() {
    return this.contactForm.get('fullname') as FormControl;
  }

  get email() {
    return this.contactForm.get('email') as FormControl;
  }

  get phonenumber() {
    return this.contactForm.get('phonenumber') as FormControl;
  }

  get message() {
    return this.contactForm.get('message') as FormControl;
  }
}
