import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toast: HotToastService) {}

  success(msg: string) {
    this.toast.success(msg, {
      duration: 2000,
      position: 'top-right',
      dismissible: true,
      style: {
        border: '1px solid #FFFFFF',
        padding: '16px',
        color: '#ffffff',
        background: '#34AA44',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#34AA44',
      },
    });
  }

  info(msg: string) {
    this.toast.success(msg, {
      duration: 2000,
      position: 'top-center',
      dismissible: true,
      style: {
        border: '1px solid #FFFFFF',
        padding: '16px',
        color: '#ffffff',
        background: '#4B57B6',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#4B57B6',
      },
    });
  }

  error(msg: string) {
    this.toast.error(msg, {
      duration: 5000,
      position: 'top-right',
      dismissible: true,
      style: {
        border: '1px solid #FFFFFF',
        padding: '16px',
        color: '#ffffff',
        background: '#ff0102',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#ff0102',
      },
    });
  }

  warn(msg: string) {
    this.toast.warning(msg, {
      duration: 2000,
      position: 'top-right',
      dismissible: true,
      style: {
        border: '1px solid #FFFFFF',
        padding: '16px',
        color: '#ffffff',
        background: '#FFAB00',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#FFAB00',
      },
    });
  }

  custom(
    msg: string,
    mode: string,
    text_color: string,
    background_color: string
  ) {
    var options: any = {
      duration: 5000,
      position: 'top-center',
      style: {
        border: `1px solid ${text_color}`,
        padding: '16px',
        color: text_color,
        background: background_color,
      },
      iconTheme: {
        primary: text_color,
        secondary: background_color,
      },
    };
    if (mode === 'success') this.toast.success(msg, options);
    if (mode === 'warning') this.toast.warning(msg, options);
    if (mode === 'error') this.toast.error(msg, options);
    if (mode === 'loading') this.toast.loading(msg, options);
    if (mode === 'info') this.toast.info(msg, options);
    if (mode === 'show') this.toast.show(msg, options);
  }
}
