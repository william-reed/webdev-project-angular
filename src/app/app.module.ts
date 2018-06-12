import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ReminderlistComponent} from './reminderlist/reminderlist.component';
import {NewReminderComponent} from './new-reminder/new-reminder.component';
import {AnonNewReminderComponent} from './anon-new-reminder/anon-new-reminder.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReminderlistComponent,
    NewReminderComponent,
    AnonNewReminderComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
