import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';
import {AlertManager} from '../alert/alert.manager';

declare var $: any;

@Component({
  selector: 'app-add-reminder-modal',
  templateUrl: './add-reminder-modal.component.html',
  styleUrls: ['./add-reminder-modal.component.css']
})
export class AddReminderModalComponent implements OnInit, OnChanges {

  reminderAlertManager = new AlertManager();
  @Output() modalClosed = new EventEmitter();
  @Input() reminderContent: string;
  reminder = new Reminder();

  constructor(private reminderService: ReminderService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reminderContent && changes.reminderContent.firstChange) {
      return;
    }

    this.reminder.content = this.reminderContent;
    this.openModal();
  }

  addReminder(reminder: Reminder) {
    if (!reminder.content) {
      this.reminderAlertManager.addWarningAlert('Reminder message not given');
      return;
    }
    if (!reminder.timeToSend) {
      this.reminderAlertManager.addWarningAlert('Reminder date not given');
      return;
    }
    const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    if (new Date(reminder.timeToSend) < fiveMinutesFuture) {
      this.reminderAlertManager.addWarningAlert('Time to send must be more than five minutes in the future');
      return;
    }

    delete reminder._id;
    delete reminder.userId;
    delete reminder.sent;

    this.reminderService.addReminder(reminder)
      .then((res) => {
        this.modalClosed.emit('Reminder added!');
        this.closeModal();
      }).catch(rej => {
        this.modalClosed.emit('Error occured adding alert: ' + rej);
        this.closeModal();
      }
    );
  }

  openModal() {
    $('#reminderModal').modal('show');
  }

  closeModal() {
    $('#reminderModal').modal('hide');
  }

}
