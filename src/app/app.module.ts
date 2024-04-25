import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TheySaidComponent } from './components/they-said/they-said.component';
import { IntroComponent } from './components/intro/intro.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DarkGreenDirective } from './directives/dark-green.directive';
import { JoinToUsComponent } from './components/join-to-us/join-to-us.component';
import { OverviewComponent } from './components/overview/overview.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerficationComponent } from './components/verfication/verfication.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationCodeComponent } from './components/confirmation-code/confirmation-code.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TheySaidComponent,
    IntroComponent,
    NotFoundComponent,
    DarkGreenDirective,
    JoinToUsComponent,
    OverviewComponent,
    LoginComponent,
    RegistrationComponent,
    VerficationComponent,
    PassResetComponent,
    ConfirmationCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
