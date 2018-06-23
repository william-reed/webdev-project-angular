import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {

  @Input() reminders: Reminder[];
  @Input() showDelete = false;
  @Input() showAdd = false;

  @Output() addReminder = new EventEmitter();
  pnotify;

  constructor(private reminderService: ReminderService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    if (this.reminders === undefined) {
      this.getReminders();
    }
  }

  getReminders(): void {
    this.reminderService.getRandomReminders().then((reminders) => this.reminders = reminders);
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
        this.pnotify.success('Reminder deleted');
        this.reminders = this.reminders.filter(r => r._id !== reminder._id);
      })
      .catch((err) => this.pnotify.error('Error deleting reminder: ' + err));
  }

  add(reminder: Reminder) {
    this.addReminder.emit(reminder);
  }

}
