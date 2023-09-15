import { Injectable } from '@angular/core';
import { Faqs } from '../../core/IApp';
import { GlobalsService } from '../../core/globals';
import { RequestService } from '../../core/request';

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  faqs: Array<Faqs> = [];

  constructor(private api: RequestService, private globals: GlobalsService) {}

  async getFaqs() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get('site/faqs');
        this.faqs = resp.data;
        this.globals.spinner.hide();
        resolve(resp);
      } catch (err: any) {
        this.globals.spinner.hide();
        this.globals.toast.error(err.message);
        reject(err);
      }
    });
  }

  async createFaq(data: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.post('site/faqs', data);
        this.faqs.push(resp.data);
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
}
