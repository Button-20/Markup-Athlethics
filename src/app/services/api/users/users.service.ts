import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getUserProfile() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('user');
        this.globals.user = resp.data;
        this.globals.storage.setUserDetails(resp.data);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }
}
