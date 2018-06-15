import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {ProfileComponent} from './profile/profile.component';
import {RecurringDashboardComponent} from './recurring-dashboard/recurring-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login-register', component: LoginRegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'recurring-dashboard', component: RecurringDashboardComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

