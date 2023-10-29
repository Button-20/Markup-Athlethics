import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { StudentsService } from 'src/app/services/api/students/students.service';
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
    extra_curricular_activities: new FormControl([], [Validators.required]),
    transcript_path: new FormControl([]),
    academic_achievement: new FormControl(''),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  files: any[] = [];

  educationLevels: string[] = [
    'High School',
    'College',
    'University',
    'Technical or vocational education',
    'No formal education',
  ];

  nationalities: string[] = ['Ghanaian', 'Nigerian', 'South African'];

  activities: string[] = [
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
    await this.studentsService.getEducationalBackgroundData();
    this.profileDataForm.patchValue({
      course_of_study: this.studentsService.education?.course_of_study,
      gpa: this.studentsService.education?.gpa,
      graduation_year: this.studentsService.education?.graduation_year,
      extra_curricular_activities:
        this.studentsService?.education?.extra_curricular_activities,
      transcript_path: this.studentsService?.education?.transcript_path,
      academic_achievement:
        this.studentsService?.education?.academic_achievement,
    });
  }

  async onSubmit() {
    await this.studentsService.updateEducationalBackgroundData(
      this.profileDataForm.value,
      this.studentsService.education?.id as number
    );
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

  onExtraChange(event: any) {
    const formControl = this.profileDataForm.get(
      'extra_curricular_activities'
    ) as FormControl;
    const extras = formControl.value;
    if (extras.includes(event.target.value)) {
      extras.splice(extras.indexOf(event.target.value), 1);
    } else {
      extras.push(event.target.value);
    }
    formControl.setValue(extras);
  }

  async dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    for (const file of event.dataTransfer?.files || event.target.files) {
      const response = await this.studentsService.uploadImage({ file });
      this.files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: response,
      });
    }
    this.profileDataForm.patchValue({
      transcript_path: this.files,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      transcript_path: this.files,
    });
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
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
}
