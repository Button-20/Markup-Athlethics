import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss'],
})
export class UserTypeComponent {
  userTypes: string[] = ['Student', 'Coach'];

  userTypeForm: FormGroup = new FormGroup({
    userType: new FormControl(''),
  });

  constructor(private globals: GlobalsService) {}

  onSubmit() {
    this.globals.router.navigate([`/auth/signup`], {
      queryParams: {
        userType: this.userTypeForm.value.userType.toLowerCase(),
      },
    });
  }
}
