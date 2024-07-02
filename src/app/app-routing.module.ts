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
import { authGaurdGuard } from './gaurds/auth-gaurd.guard';
import { DashPlaygroundsComponent } from './components/dash-playgrounds/dash-playgrounds.component';
import { AddPG1Component } from './components/add-playground/add-pg1/add-pg1.component';
import { AddPG2Component } from './components/add-playground/add-pg2/add-pg2.component';
import { AddPG3Component } from './components/add-playground/add-pg3/add-pg3.component';
import path from 'path';
import { AddPG5Component } from './components/add-playground/add-pg5/add-pg5.component';
import { AddPG4Component } from './components/add-playground/add-pg4/add-pg4.component';
import { AddPG6Component } from './components/add-playground/add-pg6/add-pg6.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AllemployeesComponent } from './components/allemployees/allemployees.component';
import { EmployeesP2Component } from './components/employees-p2/employees-p2.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'confirmation', component: ConfirmationCodeComponent },
  { path: 'verification', component: VerficationComponent },
  { path: 'passreset', component: PassResetComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: DashOverviewComponent,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'employeesP2',
        component: EmployeesP2Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'allemployees',
        component: AllemployeesComponent,
        canActivate: [authGaurdGuard],
      },

      {
        path: 'playgrounds',
        component: DashPlaygroundsComponent,
        canActivate: [authGaurdGuard],
        children: [
          {
            path: 'bookable',
            component: DashPlaygroundsComponent,
            canActivate: [authGaurdGuard],
          },
          {
            path: 'unbookable',
            component: DashPlaygroundsComponent,
            canActivate: [authGaurdGuard],
          },
        ],
      },
      {
        path: 'playgrounds/add1',
        component: AddPG1Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'playgrounds/add2',
        component: AddPG2Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'playgrounds/add3',
        component: AddPG3Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'playgrounds/add4',
        component: AddPG4Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'playgrounds/add5',
        component: AddPG5Component,
        canActivate: [authGaurdGuard],
      },
      {
        path: 'playgrounds/add6',
        component: AddPG6Component,
        canActivate: [authGaurdGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
