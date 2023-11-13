import { Component } from '@angular/core';
import { CoachesService } from 'src/app/services/api/coaches/coaches.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent {
  constructor(public coachesService: CoachesService) {}

  async ngOnInit() {
    await this.coachesService.getAllConnectionsData();
  }
}
