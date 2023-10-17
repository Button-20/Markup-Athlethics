import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Education, Student } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  student: Student | null = null;

  education: Education | null = null;

  athleticBackground: any = null;

  editable: boolean = false;

  sports: any[] = [];

  images: string[] = [];

  students: any[] = [];

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getStudentProfiles() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('students-profile');
        this.students = resp.students;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
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
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async getStudentData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('students-data');
        this.student = resp.data[0];
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async updateStudentData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update('students-data', data);
        this.student = resp.data[0];
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
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
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async getEducationalBackgroundData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('educational-backgrounds-data');
        this.education = resp.data[0];
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async uploadImage(data: { file: any; resource_type?: string }) {
    return await new Promise(async (resolve, reject) => {
      this.globals.spinner.show();
      try {
        const myFormData = new FormData();
        data.resource_type &&
          myFormData.append('resource_type', data.resource_type);
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
        this.globals.toast.success(resp.message);
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async updateAthleticBackgroundData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update(
          'athletic-backgrounds-data',
          data
        );
        this.globals.spinner.hide();
        this.globals.toast.success('Athletic Background Updated');
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async getAthleticBackgroundData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('athletic-backgrounds-data');
        this.athleticBackground = resp.data[2];
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message || '😭 Something went wrong');
        reject(err);
      }
    });
  }

  async getSportsData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get(
          'sports/with-positions-and-skills'
        );
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

  async postImageData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('image-data', {
          image_path: data,
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

  async getImageData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('image-data');
        this.images = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        reject(err);
      }
    });
  }

  async postVideoData(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('video-data', {
          video_path: data,
        });
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
}
