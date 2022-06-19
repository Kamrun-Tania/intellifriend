import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterOrganizationRoutingModule } from './register-organization-routing.module';
import { BirthDateComponent } from './birth-date/birth-date.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { RouterModule, Routes } from '@angular/router';
import { RegisterOrganizationComponent } from './register-organization.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [];
@NgModule({
  declarations: [
    BirthDateComponent,
    NavBarComponent,
    OrganizationDetailsComponent,
    RegisterOrganizationComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    RegisterOrganizationRoutingModule,
    ReactiveFormsModule,
    ArchwizardModule
  ],
  exports: [RouterModule]
})
export class RegisterOrganizationModule { }
