import {Component, OnInit} from '@angular/core';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminderlist.component.html',
  styleUrls: ['./reminderlist.component.css']
})
export class ReminderlistComponent implements OnInit {

  reminders: Reminder[];

  constructor(private reminderService: ReminderService) {
  }

  ngOnInit() {
    this.getReminders();
  }

  getReminders(): void {
    this.reminderService.getReminders().then((reminders: Reminder[]) => this.reminders = reminders);
  }

}
