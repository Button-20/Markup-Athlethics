import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
import { Sports } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-athletic-background',
  templateUrl: './athletic-background.component.html',
  styleUrls: ['./athletic-background.component.scss'],
})
export class AthleticBackgroundComponent {
  profileDataForm: FormGroup = new FormGroup({
    athletic_achievements: new FormControl('', [Validators.required]),
    sport_type: new FormControl([], [Validators.required]),
    soccer_skill_level: new FormControl('', [Validators.required]),
    soccer_position_played: new FormControl('', [Validators.required]),
    athletic_skill_level: new FormControl('', [Validators.required]),
    athletic_position_played: new FormControl('', [Validators.required]),
    letters_of_recommendation: new FormControl([]),
    references: new FormControl([]),
  });

  skillLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  athleticPositions: string[] = ['100m', '200m', '400m', '800m', '1500m'];
  positions: string[] = ['Defender', 'Striker'];

  files: any[] = [];

  constructor(
    public globals: GlobalsService,
    public usersService: UsersService
  ) {}

  async ngOnInit() {
    await this.usersService.getSportsData();
    await this.usersService.getSportsPositionsData();
  }

  onSubmit() {
    if (this.profileDataForm.invalid) {
      this.globals.toast.error('Please fill the form correctly');
      return;
    }
    this.globals.storage.setProfileDetailsForm(this.profileDataForm.value);
    this.globals.router.navigate(['/student/complete-profile/academic']);
  }

  gotoDashboard() {
    this.globals.router.navigate(['/student/dashboard']);
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

    if (
      mainElement.nodeName !== 'BUTTON' ||
      mainElement.classList.contains('select-btn')
    )
      mainElement = mainElement.parentNode;

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

  addSport(sport: Sports) {
    const sports = this.profileDataForm.get('sport_type') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex === -1) {
      sports.value.push(sport);
    } else {
      sports.value.splice(sportIndex, 1);
    }
  }

  removeSport(sport: string) {
    const sports = this.profileDataForm.get('sport_type') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex !== -1) {
      sports.value.splice(sportIndex, 1);
    }
  }

  addItem(item: string, input: string) {
    const control = this.profileDataForm.get(input) as FormControl;
    const itemIndex = control.value.indexOf(item);
    if (itemIndex === -1) {
      control.value.push(item);
    } else {
      control.value.splice(itemIndex, 1);
    }
  }

  addReference() {
    const references = this.profileDataForm.get('references') as FormControl;
    references.value.push({
      name: '',
      email: '',
    });
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];

    this.profileDataForm.patchValue({
      letters_of_recommendation: this.files,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      letters_of_recommendation: this.files,
    });
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onSliderInput(event: any) {
    const input = event.target;
    const value = input.value;
    const min = input.min || 0;
    const max = input.max || 100;
    const percent = ((value - min) * 100) / (max - min);
    input.style.background = `linear-gradient(to right, #BF2E1B 0%, #BF2E1B ${percent}%, #fff ${percent}%, white 100%)`;
    const valueContainer = input.nextElementSibling;
    valueContainer.style.left = `calc(${percent}% + (${
      8 - percent * 0.265 - 1.5
    }px))`;
  }
}
