import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalsService } from './globals';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  jwt: string = '';
  headers: any = {
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
    },
  };
  url: string = environment.BASE_URL;

  constructor(private http: HttpClient, private globals: GlobalsService) {}

  async get(routes: string) {
    return await new Promise((resolve, reject) => {
      try {
        this.http.get(this.url + routes, this.headers).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error) => {
            if (
              error.error.auth == false &&
              error.error.message ==
                'Fail to Authentication. Error -> TokenExpiredError: jwt expired'
            )
              this.globals.loggedOut();
            if (!error.success) reject(error.error);
            this.globals.spinner.hide();
          }
        );
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async post(routes: string, data: any) {
    return await new Promise((resolve, reject) => {
      try {
        // if(!this._globals.internet) this.storeRequest(this.url + routes, "POST", data);
        this.http.post(this.url + routes, data, this.headers).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error) => {
            if (
              error.error.auth == false &&
              error.error.message ==
                'Fail to Authentication. Error -> TokenExpiredError: jwt expired'
            )
              this.globals.loggedOut();
            if (!error.success || error.error) reject(error.error);
          }
        );
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async update(routes: string, data: any) {
    return await new Promise((resolve, reject) => {
      try {
        // if(!this._globals.internet) this.storeRequest(this.url + routes, "PUT", data);
        this.http.put(this.url + routes, data, this.headers).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error) => {
            if (
              error.error.auth == false &&
              error.error.message ==
                'Fail to Authentication. Error -> TokenExpiredError: jwt expired'
            )
              this.globals.loggedOut();
            if (!error.success) reject(error.error);
          }
        );
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async delete(routes: string, data?: any) {
    return await new Promise((resolve, reject) => {
      try {
        if (data) this.headers.body = data;
        this.http.delete(this.url + routes, this.headers).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error) => {
            if (
              error.error.auth == false &&
              error.error.message ==
                'Fail to Authentication. Error -> TokenExpiredError: jwt expired'
            )
              this.globals.loggedOut();
            if (!error.success) reject(error.error);
          }
        );
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async patch(routes: string, data: any = {}) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.http.patch(this.url + routes, data).subscribe(
          (res: any) => {
            resolve(res);
          },
          ({ error }: any) => {
            reject(error.message);
          }
        );
      } catch (ex: any) {
        reject(ex.error.message || ex.message || ex);
      }
    });
  }
}
