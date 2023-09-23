import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
import { Skills, Sports } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-athletic-background',
  templateUrl: './athletic-background.component.html',
  styleUrls: ['./athletic-background.component.scss'],
})
export class AthleticBackgroundComponent {
  profileDataForm: FormGroup = new FormGroup({
    sports: new FormControl([], [Validators.required]),
    athletic_achievements: new FormControl('', [Validators.required]),
    letters_of_recommendation: new FormControl([]),
    references: new FormControl([]),
    skills: new FormControl([]),
  });

  skillLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];

  files: any[] = [];

  constructor(
    public globals: GlobalsService,
    public usersService: UsersService
  ) {}

  async ngOnInit() {
    await this.usersService.getSportsData();
  }

  async onSubmit() {
    this.profileDataForm.patchValue({
      sports: this.profileDataForm.value.sports.map((sport: Sports) => {
        return sport.sport_name;
      }),
    });
    this.profileDataForm.value.sports.forEach((sport: string) => {
      let skills: any[] = [];
      let skill = {
        [`${sport.toLowerCase().replace(' ', '_')}_position_played`]:
          this.profileDataForm.value[
            `${sport.toLowerCase().replace(' ', '_')}_position_played`
          ].position_name,
      };
      skills.push(skill);
      this.profileDataForm.patchValue({
        skills,
      });
    });
    await this.usersService.postAthleticBackgroundData(
      this.profileDataForm.value
    );
    this.globals.router.navigate(['/student/complete-profile/image-uploads']);
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
    const sports = this.profileDataForm.get('sports') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex === -1) {
      sports.value.push(sport);
      this.createFormControls(sport.sport_name.toLowerCase().replace(' ', '_'));
    }
  }

  removeSport(sport: Sports) {
    const sports = this.profileDataForm.get('sports') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex !== -1) {
      sports.value.splice(sportIndex, 1);
      this.removeFormControls(sport.sport_name.toLowerCase().replace(' ', '_'));
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

  onSliderInput(event: any, sport: Sports) {
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

    const skill = this.profileDataForm.get(
      `${sport.sport_name.toLowerCase().replace(' ', '_')}_${event.target.name
        .toLowerCase()
        .replace(' ', '_')}`
    ) as FormControl;
    skill.setValue(value);
  }

  selectItem(value: any, sport: Sports, controlString: string) {
    const control = this.profileDataForm.get(
      `${sport.sport_name.toLowerCase().replace(' ', '_')}_${controlString}`
    ) as FormControl;
    control.setValue(value);

    if (controlString === 'position_played') {
      value.skills?.forEach((skill: any) => {
        skill?.skills?.forEach((skill: any) => {
          this.profileDataForm.addControl(
            `${sport.sport_name.toLowerCase().replace(' ', '_')}_${skill
              .toLowerCase()
              .replace(' ', '_')}`,
            new FormControl(null, [Validators.required])
          );
        });
      });
    }
  }

  displayValue(sport: Sports, control: string) {
    const value = this.profileDataForm.get(
      `${sport.sport_name?.toLowerCase().replace(' ', '_')}_${control}`
    )?.value;
    return value;
  }

  createFormControls(sport: string) {
    this.profileDataForm.addControl(
      `${sport}_skill_level`,
      new FormControl('', [Validators.required])
    );
    this.profileDataForm.addControl(
      `${sport}_position_played`,
      new FormControl(null, [Validators.required])
    );
  }

  removeFormControls(sport: string) {
    this.profileDataForm.removeControl(`${sport}_skill_level`);
    this.profileDataForm.removeControl(`${sport}_position_played`);
  }

  getPositionSkills(sport: Sports, control: string): Skills[] {
    return this.profileDataForm.get(
      `${sport.sport_name?.toLowerCase().replace(' ', '_')}_${control}`
    )?.value?.skills;
  }

  addReference() {
    const references = this.profileDataForm.get('references') as FormControl;
    references.value.push({
      id: references.value.length + 1,
      name: '',
      email: '',
    });
  }

  onReferenceInput(event: any, index: number, control: string) {
    const reference = this.profileDataForm.get('references') as FormControl;
    const referenceIndex = reference.value.findIndex(
      (ref: any) => ref.id === index + 1
    );
    if (referenceIndex !== -1) {
      reference.value[referenceIndex][control] = event.target.value;
    }
  }
}
