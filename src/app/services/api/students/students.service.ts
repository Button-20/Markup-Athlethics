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

  videos: string[] = [];

  students: any[] = [];

  studentsQuery: any = {
    type: '',
    category: 'All Categories',
  };

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getStudentProfiles() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        let params = '';
        Object.keys(this.studentsQuery).forEach((key) => {
          if (this.studentsQuery[key]) {
            if (
              key === 'category' &&
              this.studentsQuery[key] === 'All Categories'
            ) {
              return;
            }
            params += `${key}=${this.studentsQuery[key]}&`;
          }
        });
        const resp: any = await this.api.get(
          `students-profile${params ? `?${params}` : ''}`
        );
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

  async getStudentProfile(id: string) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get(`student-profile/${id}`);
        this.student = resp.students[0];
        if (!this.student) return;
        this.student.athletic_backgrounds =
          resp.students[0]?.athletic_backgrounds[0];
        this.student.athletic_backgrounds.skills = JSON.parse(
          resp.students[0]?.athletic_backgrounds.skills
        );
        this.student.athletic_backgrounds.references = JSON.parse(
          resp.students[0]?.athletic_backgrounds.references
        );
        console.log(this.student);
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

  async updateStudentData(userId: number, data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update(
          `students-data/${userId}`,
          data
        );
        this.globals.toast.success(resp.message);
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

  async updateEducationalBackgroundData(data: any, id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update(
          `educational-backgrounds-data/${id}`,
          data
        );
        this.globals.spinner.hide();
        this.globals.toast.success('Educational Background Updated');
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

  async updateAthleticBackgroundData(data: any, id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.update(
          `athletic-backgrounds-data/${id}`,
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
        this.athleticBackground = resp.data[0];
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

  async deleteImageData(id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.delete(`image-data/${id}`);
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

  async getVideoData() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('video-data');
        this.videos = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async getStudentsPendingApproval() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('pending-approval-students');
        this.students = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async deleteVideoData(id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.delete(`video-data/${id}`);
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

  async suspendStudent(id: number) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post(`suspend-student/${id}`, {});
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
