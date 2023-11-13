import { Component } from '@angular/core';
import { AdminsService } from 'src/app/services/api/admins/admins.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent {
  constructor(
    public adminsService: AdminsService,
    public globals: GlobalsService
  ) {}

  async ngOnInit() {
    await this.adminsService.getAllAdminsData();
  }
}
