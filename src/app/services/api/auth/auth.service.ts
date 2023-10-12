import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: RequestService,
    private globals: GlobalsService,
    private usersService: UsersService,
    private http: HttpClient
  ) {}

  async login(user: User) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('auth/login', user);
        this.globals.storage.setAccessToken(resp.token);
        this.globals.user = resp.user;
        this.globals.storage.setUserDetails(resp.user);
        this.globals.toast.success('🎉 Login successful!!');
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async register(user: User, type: string = 'student') {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(`register-${type}`, user);
        this.globals.toast.success('🎉 Registration successful!!');
        this.globals.storage.setAccessToken(resp.token);
        this.globals.storage.setUserDetails(resp.user);
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

  async forgotPassword({ email }: { email: string }) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('forgot-password', {
          email,
        });
        this.globals.spinner.hide();
        this.globals.toast.success('🎉 Password reset link sent to your email');
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async resetPassword({
    email,
    token,
    password,
    password_confirmation,
  }: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('reset-password', {
          email,
          token,
          password,
          password_confirmation,
        });
        this.globals.spinner.hide();
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
        this.globals.spinner.show();
        // await this.api.post('logout', {});
        this.globals.storage.logOutUser();
        this.globals.spinner.hide();
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async contactUs(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('send-contact', data);
        this.globals.spinner.hide();
        this.globals.toast.success('🎉 Message sent successfully');
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
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
