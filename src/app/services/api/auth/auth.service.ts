import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: RequestService,
    private globals: GlobalsService,
    private http: HttpClient
  ) {}

  async login(user: User) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('auth/login', user);
        this.globals.toast.success(resp.message);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }
  
  async register(user: User) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('auth/regi', user);
        this.globals.toast.success(resp.message);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async changePassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('auth/reset-password', {
          password,
          token,
        });
        this.globals.spinner.hide();
        this.globals.toast.success(resp.message);
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async logout() {
    return await new Promise(async (resolve, reject) => {
      try {
        // const resp: any = await this.api.get('logout');
        this.globals.storage.logOutUser();
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUserLocation() {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.http
          .get('https://ipapi.co/json/')
          .toPromise();
        resolve(resp);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
