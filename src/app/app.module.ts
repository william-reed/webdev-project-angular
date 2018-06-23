import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ReminderListComponent} from './reminderlist/reminder-list.component';
import {NewReminderComponent} from './new-reminder/new-reminder.component';
import {AnonNewReminderComponent} from './anon-new-reminder/anon-new-reminder.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {AppRoutingModule} from './app-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {RecurringCardComponent} from './recurring-card/recurring-card.component';
import {RecurringDashboardComponent} from './recurring-dashboard/recurring-dashboard.component';
import {SearchBoxComponent} from './search-box/search-box.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {SubscriptionModalComponent} from './subscription-modal/subscription-modal.component';
import {SubscriptionListComponent} from './subscription-list/subscription-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TextModalComponent } from './text-modal/text-modal.component';
import { AddReminderModalComponent } from './add-reminder-modal/add-reminder-modal.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEntityListComponent } from './admin-entity-list/admin-entity-list.component';
import {PNotifyService} from './services/pnotify.service';
import { AdminUserInputComponent } from './admin-user-input/admin-user-input.component';
import { AdminReminderInputComponent } from './admin-reminder-input/admin-reminder-input.component';
import { AdminAnonReminderInputComponent } from './admin-anon-reminder-input/admin-anon-reminder-input.component';
import { AdminSubscriptionInputComponent } from './admin-subscription-input/admin-subscription-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReminderListComponent,
    NewReminderComponent,
    AnonNewReminderComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    ProfileComponent,
    RecurringCardComponent,
    RecurringDashboardComponent,
    SearchBoxComponent,
    SearchPageComponent,
    SubscriptionModalComponent,
    SubscriptionListComponent,
    NavBarComponent,
    TextModalComponent,
    AddReminderModalComponent,
    AdminDashboardComponent,
    AdminEntityListComponent,
    AdminUserInputComponent,
    AdminReminderInputComponent,
    AdminAnonReminderInputComponent,
    AdminSubscriptionInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [PNotifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
