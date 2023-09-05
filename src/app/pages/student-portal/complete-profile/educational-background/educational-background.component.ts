import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-educational-background',
  templateUrl: './educational-background.component.html',
  styleUrls: ['./educational-background.component.scss'],
})
export class EducationalBackgroundComponent {
  profileDataForm: FormGroup = new FormGroup({
    activities: new FormControl([], [Validators.required]),
    transcript: new FormControl(null),
  });

  transcriptImg: any;

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

  constructor(private globals: GlobalsService) {}

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

    if (mainElement.nodeName !== 'BUTTON')
      mainElement = mainElement.parentNode.parentNode;

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
    const activities = this.profileDataForm.get('activities') as FormControl;
    const activityIndex = activities.value.indexOf(activity);
    if (activityIndex === -1) {
      activities.value.push(activity);
    } else {
      activities.value.splice(activityIndex, 1);
    }
  }

  removeActivity(activity: string) {
    const activities = this.profileDataForm.get('activities') as FormControl;
    const activityIndex = activities.value.indexOf(activity);
    if (activityIndex !== -1) {
      activities.value.splice(activityIndex, 1);
    }
  }

  gotoDashboard() {
    this.globals.router.navigate(['/student/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.profileDataForm.patchValue({
      transcript: event.dataTransfer?.files[0] || event.target.files[0],
    });

    if (!this.profileDataForm.value.transcript) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.transcriptImg = reader.result;
    });
    reader.readAsDataURL(this.profileDataForm.value.transcript);
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
