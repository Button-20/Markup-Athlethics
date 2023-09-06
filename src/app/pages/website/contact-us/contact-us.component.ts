import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(public authService: AuthService) {}

  async onSubmit(event: any) {
    console.log(event);
    await this.authService.contactUs(event);
  }
}
