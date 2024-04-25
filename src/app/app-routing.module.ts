import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { VerficationComponent } from './components/verfication/verfication.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { ConfirmationCodeComponent } from './components/confirmation-code/confirmation-code.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registration', component: RegistrationComponent },
  { path: 'confirmation', component: ConfirmationCodeComponent },
  { path: 'Verfication', component: VerficationComponent },
  { path: 'Passreset', component: PassResetComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
