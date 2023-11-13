import { Component } from '@angular/core';
import { CoachesService } from 'src/app/services/api/coaches/coaches.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent {
  constructor(
    public coachesService: CoachesService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    await this.coachesService.getAllCoachesData();
  }
}
