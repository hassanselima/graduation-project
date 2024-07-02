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
import { CommonModule, registerLocaleData } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PgCardComponent } from './components/pg-card/pg-card.component';
import { BookedPdayComponent } from './components/booked-pday/booked-pday.component';
import { DashOverviewComponent } from './components/dash-overview/dash-overview.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { DashPlaygroundsComponent } from './components/dash-playgrounds/dash-playgrounds.component';
import { PlaygroundDetailsComponent } from './components/playground-details/playground-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddPG1Component } from './components/add-playground/add-pg1/add-pg1.component';
import { AddPG2Component } from './components/add-playground/add-pg2/add-pg2.component';
import { AddPG3Component } from './components/add-playground/add-pg3/add-pg3.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddPG4Component } from './components/add-playground/add-pg4/add-pg4.component';
import { AddPG5Component } from './components/add-playground/add-pg5/add-pg5.component';
import { AddPG6Component } from './components/add-playground/add-pg6/add-pg6.component';
import { ReviewComponent } from './components/review/review.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { AllemployeesComponent } from './components/allemployees/allemployees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardDetailsComponent } from './components/guard-details/guard-details.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesP2Component } from './components/employees-p2/employees-p2.component';
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
    AreaChartComponent,
    DonutChartComponent,
    DashPlaygroundsComponent,
    PlaygroundDetailsComponent,
    LoaderComponent,
    GoogleMapsComponent,
    AddPG1Component,
    AddPG2Component,
    AddPG3Component,
    AddPG4Component,
    AddPG5Component,
    AddPG6Component,
    ReviewComponent,
    AllemployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxApexchartsModule,
    GoogleMapsModule,
  ],
  providers: [provideClientHydration(), { provide: LOCALE_ID, useValue: 'ar' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
