import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class CoachesService {
  connections: any[] = [];

  coaches: any[] = [];

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async postConnection(athlete_id: string, coach_id: string) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('connections/connect', {
          athlete_id,
          coach_id,
        });
        this.globals.spinner.hide();
        this.globals.toast.success(resp.message);
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async postViews(athlete_id: string, coach_id: string) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(`profile/view`, {
          athlete_id,
          coach_id,
        });
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async getAllConnectionsData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('get-all-connections-data');
        console.log(resp);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }
  async getAllCoachesData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('get-all-coaches-data');
        console.log(resp);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }
}
