import {Component, Input, OnInit} from '@angular/core';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';
import {AlertManager} from '../alert/alert.manager';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {

  @Input() reminders: Reminder[];
  @Input() showDelete = false;
  @Input() alertManager: AlertManager = new AlertManager();

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

  delete(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder._id)
      .then(() => {
        this.alertManager.addSuccessAlert('Reminder deleted');
        this.reminders = this.reminders.filter(r => r._id !== reminder._id);
      })
      .catch((err) => this.alertManager.addDangerAlert('Error deleting reminder: ' + err));
  }

}
