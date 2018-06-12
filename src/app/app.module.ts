import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReminderlistComponent } from './reminderlist/reminderlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReminderlistComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
