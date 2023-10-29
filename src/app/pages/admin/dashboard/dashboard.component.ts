import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/api/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(public usersService: UsersService) { }
  
  async ngOnInit() {
    await this.usersService.getDashboardData();
  }
}
