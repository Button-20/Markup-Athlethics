import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/api/users/users.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  async onSubmit(formData: any) {}
}
