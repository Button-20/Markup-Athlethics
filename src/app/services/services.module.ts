import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './api/auth/auth.service';
import { GlobalsService } from './core/globals';
import { RequestService } from './core/request';
import { StorageService } from './core/storage';

const providers: Array<any> = [
  GlobalsService,
  AuthService,
  RequestService,
  StorageService,
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: providers,
})
export class ServicesModule {}
