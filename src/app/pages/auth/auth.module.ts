import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { ServicesModule } from 'src/app/services/services.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { TermsOfUseComponent } from '../website/terms-of-use/terms-of-use.component';
import { UserTypeComponent } from './user-type/user-type.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    ConfirmEmailComponent,
    LoginComponent,
    PasswordComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    PasswordResetSuccessComponent,
    TermsOfUseComponent,
    UserTypeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ServicesModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxIntlTelephoneInputModule,
  ],
})
export class AuthModule {}
