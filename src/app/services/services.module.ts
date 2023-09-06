import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './api/auth/auth.service';
import { UsersService } from './api/users/users.service';
import { GlobalsService } from './core/globals';
import { RequestService } from './core/request';
import { StorageService } from './core/storage';
import { SearchPipe } from './pipes/search/search.pipe';

const providers: Array<any> = [
  GlobalsService,
  AuthService,
  RequestService,
  StorageService,
  UsersService,
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: providers,
  declarations: [
    SearchPipe
  ],
})
export class ServicesModule {}
