import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/main-pages/welcome-page/welcome-page.component';
import { SignUpComponent } from './components/main-pages/sign-up/sign-up.component';
import { SignInComponent } from './components/main-pages/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/home-pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/reuse/navbar/navbar.component';
import { HomeComponent } from './components/home-pages/dashboard/home/home.component';
import { SettingsComponent } from './components/home-pages/dashboard/settings/settings.component';
import { InformationComponent } from './components/home-pages/dashboard/information/information.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    WelcomePageComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    SettingsComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
