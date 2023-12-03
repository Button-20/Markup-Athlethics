import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { INotification } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications: INotification[] = [];
  pusher: any;

  constructor(private globals: GlobalsService, private api: RequestService) {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    this.pusher = new Pusher('0047bd9cd0ef34e4b695', {
      cluster: 'eu',
      authEndpoint: `${environment.BASE_URL.replace(
        'api/',
        ''
      )}broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.globals.storage.getAccessToken()}`,
        },
      },
    });
  }

  async listenForNotifications(athleteId: string) {
    return await new Promise((resolve, reject) => {
      try {
        var channel = this.pusher.subscribe('private-athlete.' + athleteId);
        channel.bind('sendNotification', (data: any) => {
          console.log(data);
          this.notifications.unshift(data.notification);
          this.globals.sound.send('sound', 'message');
          this.globals.sound.send('toast', data.notification);
          !this.globals.getWindowFocus() &&
            this.globals.sound.send('browser', data.notification);
        });
        resolve(true);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async getNotifications(athleteId: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.get(`notifications/${athleteId}`);
        this.notifications = resp.data;
        resolve(resp);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async markNotificationAsRead(notificationId: string) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(
          `notifications/mark-as-read/${notificationId}`,
          {}
        );
        this.globals.toast.success(resp.message);
        resolve(resp);
      } catch (ex: any) {
        this.globals.toast.error(ex.message);
        this.globals.spinner.hide();
        reject(ex);
      }
    });
  }
}
