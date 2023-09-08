import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
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
    education_level: new FormControl('', [Validators.required]),
    profile_picture: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}-\d{2}-\d{2}$/),
    ]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
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

  constructor(
    public globals: GlobalsService,
    private usersService: UsersService
  ) {}

  async onSubmit() {
    console.log(this.profileDataForm.value);
    await this.usersService.postStudentData(this.profileDataForm.value);
    this.globals.router.navigate([
      '/student/complete-profile/educational-background',
    ]);
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

  goBack() {
    this.globals.router.navigate(['/student/dashboard']);
  }

  imageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const profile_picture = this.profileDataForm.get(
        'profile_picture'
      ) as FormControl;
      profile_picture.setValue(reader.result);
    };
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
}
