import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent {
  profileDataForm: FormGroup = new FormGroup({
    nationality: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    interests: new FormControl([], [Validators.required]),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  educationLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];

  nationalities: string[] = ['Ghanaian', 'Nigerian', 'South African'];

  interests: string[] = [
    'Nutrition and Cooking',
    'Fitness and Training',
    'Sports Science',
    'Outdoor Activities',
    'Reading',
    'Music',
    'Charity and community service',
    'Travel',
    'Fashion',
    'Art',
  ];

  constructor(public globals: GlobalsService) {}

  onSubmit() {
    console.log(this.profileDataForm.value);
  }

  toggleSelectMenu(event: any, closeOnSelect: boolean = true) {
    // close other dropdown options
    event.preventDefault();
    let mainElement = event.target;
    const element = document.querySelectorAll('.select-list');
    element.forEach((el) => {
      if (
        el.classList.contains('active') &&
        el !== mainElement.nextElementSibling &&
        closeOnSelect
      ) {
        el.classList.remove('active');
      }
    });

    if (mainElement.nodeName !== 'BUTTON') mainElement = mainElement.parentNode;

    // add show class to dropdown options
    for (let i = 0; i < mainElement.children.length; i++) {
      if (mainElement.children[i].classList.contains('select-list')) {
        mainElement.children[i].classList.toggle('active');
      }
    }

    if (closeOnSelect) {
      // close dropdown options when click outside
      document.addEventListener('mousedown', (e: any) => {
        if (!e.target?.classList.contains('select-item')) {
          element.forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            }
          });
        }
      });
    }
  }

  selectItem(item: string, type: string) {
    const formControl = this.profileDataForm.get(type) as FormControl;
    formControl.setValue(item);
  }

  onPhoneNumberChange(event: any) {
    this.profileDataForm.patchValue({
      phone: '+' + event.dialCode + ' ' + event.phoneNumber,
    });
  }

  onInterestChange(event: any) {
    const formControl = this.profileDataForm.get('interests') as FormControl;
    const interests = formControl.value;
    if (interests.includes(event.target.value)) {
      interests.splice(interests.indexOf(event.target.value), 1);
    } else {
      interests.push(event.target.value);
    }
    formControl.setValue(interests);
  }
}
