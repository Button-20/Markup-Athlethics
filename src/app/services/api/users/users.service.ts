import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  sports: any[] = [];

  editable: boolean = false;

  dashboardData: any = {};

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getUserProfile() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('user');
        this.globals.user = { ...this.globals.user, ...resp.user };
        if (this.globals.user)
          this.globals.user.preferences = JSON.parse(
            resp.user.preferences || '[]'
          );
        this.globals.storage.setUserDetails(this.globals.user);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  async updateUserProfile(data: any, slug: string) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update(`user/${slug}`, data);
        this.globals.user = resp.data;
        this.globals.storage.setUserDetails(resp.data);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async getDashboardData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('dashboard-data');
        this.dashboardData = resp;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  
}
