import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/api/users/users.service';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent {
  constructor(
    public usersService: UsersService,
    public globals: GlobalsService
  ) {}

  ngOnInit(): void {
  }

  async onSubmit(formData: any) {
    await this.usersService.updateUserProfile(formData);
  }
}
