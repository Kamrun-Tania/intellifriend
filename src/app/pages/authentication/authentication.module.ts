import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OnboardComponent } from './onboard/onboard.component';

import { SharedModule } from '../../shared/shared.module';
//import {RegisterOrganizationModule} from './register-organization/register-organization.module';
import { RegisterOrganizationsComponent } from './register-organizations/register-organizations.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
 

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UnlockUserComponent,
    ResetPwdComponent,
    ForgetPwdComponent,
    OnboardComponent,
    RegisterOrganizationsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
