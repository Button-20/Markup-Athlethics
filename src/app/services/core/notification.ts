import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { NotificationsComponent } from 'src/app/components/ui/notifications/notifications.component';
import { INotification } from './IApp';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  keywords = ['received', 'uploaded', 'extend', 'minutes'];

  constructor(private toast: HotToastService) {}

  send(type: string, data: INotification | any) {
    switch (type) {
      case 'browser':
        this.BrowserNotification(data.title, data.message);
        break;
      case 'toast':
        this.toastNotification(data);
        break;
      case 'sound':
        this.soundNotification(data);
        break;
      default:
        break;
    }
  }

  private BrowserNotification(title: string, body: string) {
    if (!('Notification' in window)) {
      // console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      this.createNotification(title, body);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission: any) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          this.createNotification(title, body);
        }
      });
    }
  }

  private createNotification(title: string, body: string) {
    var notification = new Notification(title, {
      icon: 'assets/images/favico-dark.png',
      body: body,
    });
    notification.onclick = function (event) {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open(window.location.href, '_blank');
    };
  }

  private toastNotification(data: any) {
    this.toast.show(NotificationsComponent, {
      data,
      autoClose: false,
      dismissible: true,
      className: 'text-white fs-14 bg-dark',
      style: {
        width: '30rem',
        maxWidth: '100%',
      },
      closeStyle: {
        display: 'none',
      },
      id: data.id,
      position: 'top-right',
    });
    this.soundNotification('toast');
  }

  private soundNotification(type: string) {
    switch (type) {
      case 'message':
        var audio = new Audio('assets/sounds/message-alert.mp3');
        audio.play();
        break;
      default:
        break;
    }
  }

  private includesAll(message: string, keywords: Array<string>) {
    return keywords.every((keyword) => message.toLowerCase().includes(keyword));
  }
}
