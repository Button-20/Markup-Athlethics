import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-educational-background',
  templateUrl: './educational-background.component.html',
  styleUrls: ['./educational-background.component.scss'],
})
export class EducationalBackgroundComponent {
  profileDataForm: FormGroup = new FormGroup({
    course_of_study: new FormControl('', [Validators.required]),
    gpa: new FormControl('', [Validators.required]),
    graduation_year: new FormControl('', [Validators.required]),
    academic_achievement: new FormControl('', [Validators.required]),
    extra_curricular_activities: new FormControl([], [Validators.required]),
    transcript_path: new FormControl(null),
  });

  activities: string[] = [
    'Nutrition and Cooking',
    'Fitness and Training',
    'Sports Science',
    'Outdoor Activities',
    'Music',
    'Charity and community service',
    'Fashion',
    'Art',
  ];

  constructor(
    private globals: GlobalsService,
    private usersService: UsersService
  ) {}

  async onSubmit() {
    this.profileDataForm.patchValue({
      transcript_path: await this.usersService.uploadImage({
        file: this.profileDataForm.value.transcript_path  ,
      }),
    });
    await this.usersService.postEducationalBackgroundData(
      this.profileDataForm.value
    );
    this.profileDataForm.reset({
      course_of_study: '',
      gpa: '',
      graduation_year: '',
      academic_achievement: '',
      extra_curricular_activities: [],
      transcript_path: null,
    });
    this.globals.router.navigate([
      '/portal/complete-profile/athletic-background',
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

    if (mainElement.nodeName !== 'BUTTON') {
      mainElement = mainElement.parentNode.parentNode;
    }

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

  addActivity(activity: string) {
    const activities = this.profileDataForm.get(
      'extra_curricular_activities'
    ) as FormControl;
    const activityIndex = activities.value.indexOf(activity);
    if (activityIndex === -1) {
      activities.value.push(activity);
    } else {
      activities.value.splice(activityIndex, 1);
    }
  }

  removeActivity(activity: string) {
    const activities = this.profileDataForm.get(
      'extra_curricular_activities'
    ) as FormControl;
    const activityIndex = activities.value.indexOf(activity);
    if (activityIndex !== -1) {
      activities.value.splice(activityIndex, 1);
    }
  }

  gotoDashboard() {
    this.globals.router.navigate(['/portal/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0] || event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const transcript_path = this.profileDataForm.get(
        'transcript_path'
      ) as FormControl;
      transcript_path.setValue(reader.result);
    };
  }

  get course_of_study() {
    return this.profileDataForm.get('course_of_study') as FormControl;
  }

  get gpa() {
    return this.profileDataForm.get('gpa') as FormControl;
  }

  get graduation_year() {
    return this.profileDataForm.get('graduation_year') as FormControl;
  }

  get academic_achievement() {
    return this.profileDataForm.get('academic_achievement') as FormControl;
  }
}
