import {Component, Input, OnInit} from '@angular/core';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {

  @Input() reminders: Reminder[];

  constructor(private reminderService: ReminderService) {
  }

  ngOnInit() {
    if (this.reminders === undefined) {
      this.getReminders();
    }
  }

  getReminders(): void {
    this.reminderService.getReminders().then((reminders) => this.reminders = reminders);
  }

  prettyDate(reminder: Reminder) {
    return new Date(reminder.timeToSend).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}
