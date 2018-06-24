import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../models/user';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-admin-reminder-input',
  templateUrl: './admin-reminder-input.component.html',
  styleUrls: ['./admin-reminder-input.component.css']
})
export class AdminReminderInputComponent implements OnInit {
  @Input() reminder = new Reminder();
  @Input() create = true;
  @Input() users = [];
  pnotify;

  @Output() remindersChanged = new EventEmitter();

  constructor(private reminderService: ReminderService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
  }

  submit() {
    if (this.create) {
      this.createReminder();
    } else {
      this.updateReminder();
    }
  }

  createReminder() {
    this.reminder.timeToSend = new Date(this.reminder.timeToSendString);
    if (!this.validateInput()) {
      return;
    }

    this.reminderService.addReminder(this.reminder)
      .then((res) => {
        this.pnotify.success('Reminder created');
        this.remindersChanged.emit(this.reminder);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));
  }

  updateReminder() {
    this.reminder.timeToSend = new Date(this.reminder.timeToSendString);
    if (!this.validateInput()) {
      return;
    }
    this.reminderService.updateReminder(this.reminder)
      .then((res) => {
        this.pnotify.success('Reminder updated');
        this.remindersChanged.emit(this.reminder);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));

  }

  validateInput(): boolean {
    if (this.create && !this.reminder.userId) {
      this.pnotify.error('User not selected');
      return false;
    }
    if (!this.reminder.content) {
      this.pnotify.error('Reminder message not given');
      return false;
    }
    if (!this.reminder.timeToSendString) {
      this.pnotify.error('Reminder date not given');
      return false;
    }
    // const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    // if (new Date(this.reminder.timeToSend) < fiveMinutesFuture) {
    //   this.pnotify.error('Time to send must be more than five minutes in the future');
    //   return false;
    // }
    return true;
  }

}
