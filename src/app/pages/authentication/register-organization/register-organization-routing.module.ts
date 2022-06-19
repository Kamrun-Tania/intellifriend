import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { EmailComponent } from './email/email.component';
import { BirthDateComponent } from './birth-date/birth-date.component';
import { RegisterOrganizationComponent } from './register-organization.component';
const routes: Routes = [
  { path: 'registration', component: OrganizationDetailsComponent },
  { path: 'email', component: EmailComponent },
  { path: 'birth-date', component: BirthDateComponent },
  { path: 'form-wizard', redirectTo: '/form-wizard', component: RegisterOrganizationComponent },
  { path: '**', component: RegisterOrganizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterOrganizationRoutingModule { }
