import { Component, Input } from '@angular/core';
import { Student } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
})
export class PlayerProfileComponent {
  @Input() student: Student | null = null;

  constructor(public globals: GlobalsService) {}

  getField(skill: string, skills: any, property: string) {
    return skills[skill.toLowerCase().replaceAll(' ', '_') + '_' + property];
  }
}
