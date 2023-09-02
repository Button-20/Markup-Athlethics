import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ServicesModule } from 'src/app/services/services.module';

@NgModule({
  declarations: [AuthComponent, SignupComponent, ConfirmEmailComponent, LoginComponent, PasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ServicesModule,
    ReactiveFormsModule,
    NgxIntlTelephoneInputModule,
  ],
})
export class AuthModule {}
