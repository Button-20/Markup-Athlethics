import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  sports: any[] = [];

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

  async postStudentData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('students-data', data);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async postEducationalBackgroundData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(
          'educational-backgrounds-data',
          data
        );
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async uploadImage(data: { file: any }) {
    return await new Promise(async (resolve, reject) => {
      this.globals.spinner.show();
      try {
        const myFormData = new FormData();
        myFormData.append('file', data.file);
        myFormData.append(
          'upload_preset',
          environment.cloudinary.upload_preset
        );
        myFormData.append('skipAuthorization', 'true');

        const resp: any = await this.api.upload(``, myFormData);
        const url = resp.url;
        if (resp.error) throw new Error(resp.error || resp);

        this.globals.spinner.hide();
        resolve(url);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err.message);
      }
    });
  }

  async postAthleticBackgroundData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(
          'athletic-backgrounds-data',
          data
        );
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async getSportsData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('sport-data');
        this.sports = resp.data;
        this.globals.sports = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  async getSportsPositionsData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('sport-position-data');
        this.globals.sportsPositions = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  async postImageData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('image-data', data);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }
}
