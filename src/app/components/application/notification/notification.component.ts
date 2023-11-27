import { Component, Input } from '@angular/core';
import { INotification } from 'src/app/services/core/IApp';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notifications: INotification[] = [];

  constructor() {}
}
