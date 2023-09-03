import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-athletic-background',
  templateUrl: './athletic-background.component.html',
  styleUrls: ['./athletic-background.component.scss'],
})
export class AthleticBackgroundComponent {
  profileDataForm: FormGroup = new FormGroup({
    sports: new FormControl([], [Validators.required]),
    soccer_skill_level: new FormControl('', [Validators.required]),
    soccer_position_played: new FormControl('', [Validators.required]),
    transcript: new FormControl(null),
  });

  transcriptImg: any;

  sports: string[] = ['Soccer', 'Basketball', 'Athletics'];
  skillLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  positions: string[] = ['Defender', 'Striker'];

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

  addSport(sport: string) {
    const sports = this.profileDataForm.get('sports') as FormControl;
    const sportIndex = sports.value.indexOf(sport);
    if (sportIndex === -1) {
      sports.value.push(sport);
    } else {
      sports.value.splice(sportIndex, 1);
    }
  }

  removeSport(sport: string) {
    const sports = this.profileDataForm.get('sports') as FormControl;
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
