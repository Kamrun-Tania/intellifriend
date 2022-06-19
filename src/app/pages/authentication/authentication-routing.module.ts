import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { OnboardComponent } from './onboard/onboard.component';
import { RegisterOrganizationsComponent } from './register-organizations/register-organizations.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { AuthService } from '../../shared/services/firebase/auth.service';
// import { SecureInnerPagesGuard } from '../../shared/guard/SecureInnerPagesGuard.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [SecureInnerPagesGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'onboard/:id',
        component: OnboardComponent,
      },
      {
        path: 'onboard',
        component: OnboardComponent,
      },

      {
        path: 'register-organizations',
        component: RegisterOrganizationsComponent,
      },
      {
        path: 'unlockuser',
        component: UnlockUserComponent
      },
      {
        path: 'forgetpassword',
        component: ForgetPwdComponent
      },
      {
        path: 'resetpassword',
        component: ResetPwdComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [AuthService, SecureInnerPagesGuard]
})
export class AuthenticationRoutingModule { }
