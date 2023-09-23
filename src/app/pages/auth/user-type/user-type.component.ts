import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }
  
  onSubmit() {
    console.log(this.userTypeForm.value);
  }
}
