import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { INotification } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications: INotification[] = [];

  constructor(private globals: GlobalsService, private api: RequestService) {}

  async listenForNotifications(athleteId: string) {
    return await new Promise((resolve, reject) => {
      try {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('0047bd9cd0ef34e4b695', {
          cluster: 'eu',
        });

        var channel = pusher.subscribe('private-athlete.' + athleteId);
        channel.bind('my-event', (data: any) => {
          alert(JSON.stringify(data));
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
        const resp: any = await this.api.post(
          `notifications/mark-as-read/${notificationId}`,
          {}
        );
        console.log(resp);
        resolve(resp);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
