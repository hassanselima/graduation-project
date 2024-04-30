import { LOCALE_ID, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import localeAr from '@angular/common/locales/ar';
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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { registerLocaleData } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PgCardComponent } from './components/pg-card/pg-card.component';
import { BookedPdayComponent } from './components/booked-pday/booked-pday.component';
import { DashOverviewComponent } from './components/dash-overview/dash-overview.component';
registerLocaleData(localeAr);
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
    DashboardComponent,
    SidebarComponent,
    PgCardComponent,
    BookedPdayComponent,
    DashOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration(), { provide: LOCALE_ID, useValue: 'ar' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
