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

}
