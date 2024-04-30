import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { VerficationComponent } from './components/verfication/verfication.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { ConfirmationCodeComponent } from './components/confirmation-code/confirmation-code.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashOverviewComponent } from './components/dash-overview/dash-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'confirmation', component: ConfirmationCodeComponent },
  { path: 'verfication', component: VerficationComponent },
  { path: 'passreset', component: PassResetComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: 'overview', component: DashOverviewComponent }],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
