import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'password',
        component: PasswordComponent,
      },
      {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
