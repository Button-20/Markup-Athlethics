import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/api/students/students.service';
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
  athleticPositions: string[] = ['100m', '200m', '400m', '800m', '1500m'];
  positions: string[] = ['Defender', 'Striker'];

  files: any[] = [];

  constructor(
    public globals: GlobalsService,
    public studentsService: StudentsService
  ) {}

  async ngOnInit() {
    await this.studentsService.getSportsData();
    await this.studentsService.getAthleticBackgroundData();
    this.setFormValues();
  }

  async onSubmit() {
    this.profileDataForm.patchValue({
      sports: this.profileDataForm.value.sports.map((sport: Sports) => {
        return sport.sport_name;
      }),
    });
    this.profileDataForm.value.sports.forEach((sport: string) => {
      let skills: any[] = [];
      let skill: any = {};
      // Iterate through the data object and find properties related to the current sport
      for (const key in this.profileDataForm.value as any) {
        if (key.startsWith(`${sport.toLowerCase().replaceAll(' ', '_')}_`)) {
          skill[key] = this.profileDataForm.value[key];
        }
      }

      skills.push(skill);

      this.profileDataForm.patchValue({
        skills: [...this.profileDataForm.value.skills, ...skills],
      });

      for (const key in this.profileDataForm.value as any) {
        if (key.startsWith(`${sport.toLowerCase().replaceAll(' ', '_')}_`)) {
          this.profileDataForm.removeControl(key);
        }
      }
    });

    await this.studentsService.updateAthleticBackgroundData(
      this.profileDataForm.value
    );
  }

  setFormValues() {
    let sports = JSON.parse(this.studentsService.athleticBackground.sports);
    let skills = JSON.parse(this.studentsService.athleticBackground.skills);
    this.profileDataForm.patchValue({
      ...this.studentsService.athleticBackground,
      sports: sports.map((sport: string) => {
        return this.studentsService.sports.find(
          (s: Sports) => s.sport_name === sport
        );
      }),
      references: JSON.parse(
        this.studentsService.athleticBackground.references
      ),
    });

    // create form controls for each sport
    sports.forEach((sport: string) => {
      this.createFormControls(sport.toLowerCase().replaceAll(' ', '_'));
    });

    // set values for each sport
    sports.forEach((sport: string) => {
      this.profileDataForm.patchValue({
        [`${sport.toLowerCase().replaceAll(' ', '_')}_skill_level`]:
          skills[`${sport.toLowerCase().replaceAll(' ', '_')}_skill_level`],
        [`${sport.toLowerCase().replaceAll(' ', '_')}_position_played`]:
          skills[`${sport.toLowerCase().replaceAll(' ', '_')}_position_played`],
      });
    });
    setTimeout(() => {
      if (skills)
        for (const key in skills) {
          let element = document.querySelector('#' + key) as HTMLInputElement;
          if (element) {
            element.style.background = `linear-gradient(to right, #BF2E1B 0%, #BF2E1B ${skills[key]}%, #fff ${skills[key]}%, white 100%)`;
            element.value = skills[key];
            const valueContainer = element.nextElementSibling as HTMLElement;
            valueContainer.style.left = `calc(${skills[key]}% + (${
              8 - skills[key] * 0.265 - 1.5
            }px))`;
          }
        }
    }, 50);
  }

  addSport(sport: Sports) {
    const sports = this.profileDataForm.get('sports') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex === -1) {
      sports.value.push(sport);
      // create form controls for the sport that was added. Replace spaces with underscores and make lowercase
      this.createFormControls(
        sport.sport_name.toLowerCase().replaceAll(' ', '_')
      );
    }
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

  addReference() {
    const references = this.profileDataForm.get('references') as FormControl;
    references.value.push({
      name: '',
      email: '',
    });
  }

  getPositionSkills(sport: Sports, control: string): Skills[] {
    return this.profileDataForm.get(
      `${sport.sport_name.toLowerCase().replaceAll(' ', '_')}_${control}`
    )?.value?.skills;
  }

  selectItem(value: any, sport: Sports, controlString: string) {
    const control = this.profileDataForm.get(
      `${sport.sport_name.toLowerCase().replaceAll(' ', '_')}_${controlString}`
    ) as FormControl;
    control.setValue(value);

    if (controlString === 'position_played') {
      value.skills?.forEach((skill: any) => {
        skill?.skills?.forEach((skill: any) => {
          this.profileDataForm.addControl(
            `${sport.sport_name.toLowerCase().replaceAll(' ', '_')}_${skill
              .toLowerCase()
              .replaceAll(' ', '_')}`,
            new FormControl(null, [Validators.required])
          );
        });
      });
    }
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];

    this.profileDataForm.patchValue({
      transcripts: this.files,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      transcripts: this.files,
    });
  }

  displayValue(sport: Sports, control: string) {
    const value = this.profileDataForm.get(
      `${sport.sport_name?.toLowerCase().replaceAll(' ', '_')}_${control}`
    )?.value;
    return value;
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
      `${sport.sport_name
        .toLowerCase()
        .replaceAll(' ', '_')}_${event.target.name
        .toLowerCase()
        .replaceAll(' ', '_')}`
    ) as FormControl;
    skill.setValue(value);
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
}
