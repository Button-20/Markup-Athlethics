import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  admins: any[] = [];

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getAllAdminsData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('get-all-admins-data');
        this.admins = resp;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }
}
