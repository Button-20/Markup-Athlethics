import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';
import { environment } from 'src/environments/environment';

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

  async postStudentData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('students-data', data);
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
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
        myFormData.append('upload_preset', environment.cloudinary.upload_preset);
        myFormData.append('skipAuthorization', 'true');

        const resp: any = await this.api.upload(``, myFormData);
        const url = resp.url;
        if (resp.error) throw new Error(resp.error || resp);

        this.globals.spinner.hide();
        resolve(url);
      } catch (ex: any) {
        this.globals.spinner.hide();
        reject({ error: ex.error || ex.detail || ex });
      }
    });
  }
}
