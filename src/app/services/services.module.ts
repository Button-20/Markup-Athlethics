import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AdminsService } from './api/admins/admins.service';
import { AuthService } from './api/auth/auth.service';
import { CoachesService } from './api/coaches/coaches.service';
import { FaqsService } from './api/faqs/faqs.service';
import { NewsService } from './api/news/news.service';
import { NotificationsService } from './api/notifications/notifications.service';
import { StudentsService } from './api/students/students.service';
import { UsersService } from './api/users/users.service';
import { GlobalsService } from './core/globals';
import { RequestService } from './core/request';
import { StorageService } from './core/storage';

const providers: Array<any> = [
  GlobalsService,
  AuthService,
  RequestService,
  StorageService,
  UsersService,
  NewsService,
  FaqsService,
  StudentsService,
  CoachesService,
  AdminsService,
  NotificationsService,
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: providers,
})
export class ServicesModule {}
