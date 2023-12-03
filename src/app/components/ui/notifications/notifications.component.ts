import { Component, Inject, Optional } from '@angular/core';
import { HotToastRef } from '@ngneat/hot-toast';
import { INotification } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  constructor(
    @Optional()
    @Inject(HotToastRef)
    public toastRef: HotToastRef<INotification>,
    public globals: GlobalsService
  ) {}

  ngOnInit() {
    this.countDown();
  }

  // navigateMessages(notification: any) {
  //   this.globals.navigateByTrigger(
  //     notification.trigger,
  //     notification.biddingId
  //   );
  //   notification.markedAsRead = true;
  //   notification.createdAt = new Date(notification.createdAt);
  //   this.toastRef.close();
  // }

  countDown() {
    var bar = document.getElementById('bar-close')!;
    bar.addEventListener('animationend', () => {
      this.toastRef.close();
    });
  }
}
