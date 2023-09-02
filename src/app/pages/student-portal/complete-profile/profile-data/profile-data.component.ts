import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent {
  profileDataForm: FormGroup = new FormGroup({
    nationality: new FormControl('', [Validators.required]),
    interests: new FormControl([], [Validators.required]),
    education_level: new FormControl('', [Validators.required]),
  });

  interests: string[] = [
    'Nutrition and Cooking',
    'Fitness and Training',
    'Sports Science',
    'Outdoor Activities',
    'Music',
    'Charity and community service',
    'Fashion',
    'Art',
  ];

  educationLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];

  nationalities: string[] = ['Ghanaian', 'Nigerian', 'South African'];

  constructor() {}

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

  addInterest(interest: string) {
    const interests = this.profileDataForm.get('interests') as FormControl;
    const interestIndex = interests.value.indexOf(interest);
    if (interestIndex === -1) {
      interests.value.push(interest);
    } else {
      interests.value.splice(interestIndex, 1);
    }
  }

  removeInterest(interest: string) {
    const interests = this.profileDataForm.get('interests') as FormControl;
    const interestIndex = interests.value.indexOf(interest);
    if (interestIndex !== -1) {
      interests.value.splice(interestIndex, 1);
    }
  }

  selectItem(item: string, type: string) {
    const formControl = this.profileDataForm.get(type) as FormControl;
    formControl.setValue(item);
  }
}
