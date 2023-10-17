import { Component, Input } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  @Input() margin_right: string = '';

  @Input() player: any;

  constructor(public globals: GlobalsService) {}
}
