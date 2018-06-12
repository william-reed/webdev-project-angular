import {Component, OnInit} from '@angular/core';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.css']
})
export class NewReminderComponent implements OnInit {

  newReminder: Reminder = new Reminder();

  constructor() {
  }

  ngOnInit() {
  }

}
