import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailComponent } from './pages/dashboard/company-dashboard/company-detail.component';
import { CompanyDashboardComponent } from './pages/dashboard/company-dashboard/company-dashboard.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CompanyDetailComponent,
    CompanyDashboardComponent,
    ConvertToSpacesPipe
    
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
