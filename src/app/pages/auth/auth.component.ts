import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(public globals: GlobalsService) {}
}
