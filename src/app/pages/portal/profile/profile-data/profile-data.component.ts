import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { Student } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent {
  profileDataForm: FormGroup = new FormGroup({
    nationality: new FormControl('', [Validators.required]),
    interests: new FormControl([], [Validators.required]),
    educational_level: new FormControl('', [Validators.required]),
    profile_picture: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [
      Validators.required,
      Validators.pattern(/([0-9]{4})-([0-9]{2})-([0-9]{2})/),
    ]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
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

  constructor(
    public globals: GlobalsService,
    public studentsService: StudentsService
  ) {}

  async ngOnInit() {
    await this.studentsService.getStudentData();
    this.profileDataForm.patchValue(this.studentsService.student as Student);
    this.profileDataForm.patchValue({
      interests: JSON.parse(
        this.studentsService.student?.interests as unknown as string
      ),
    });
    this.setPhoneInput(this.studentsService.student?.phone as string);
  }

  setPhoneInput(phone: string) {
    let phoneInput = document.querySelector('#phone') as HTMLInputElement;
    if (phoneInput && phone) {
      phoneInput.value = phone.substring(phone.indexOf(' ') + 1);
      phoneInput.disabled = true;
    }
  }

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

  get nationality() {
    return this.profileDataForm.get('nationality') as FormControl;
  }

  get date_of_birth() {
    return this.profileDataForm.get('date_of_birth') as FormControl;
  }

  get height() {
    return this.profileDataForm.get('height') as FormControl;
  }

  get weight() {
    return this.profileDataForm.get('weight') as FormControl;
  }

  get phone() {
    return this.profileDataForm.get('phone') as FormControl;
  }
}
