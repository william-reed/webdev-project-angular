import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';
import {PNotifyService} from '../services/pnotify.service';

declare var $: any;

@Component({
  selector: 'app-add-reminder-modal',
  templateUrl: './add-reminder-modal.component.html',
  styleUrls: ['./add-reminder-modal.component.css']
})
export class AddReminderModalComponent implements OnInit, OnChanges {

  @Output() modalClosed = new EventEmitter();
  @Input() reminderContent: string;
  reminder = new Reminder();
  pnotify;

  constructor(private reminderService: ReminderService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
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
      this.pnotify.error('Reminder message not given');
      return;
    }
    if (!reminder.timeToSend) {
      this.pnotify.error('Reminder date not given');
      return;
    }
    const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    if (new Date(reminder.timeToSend) < fiveMinutesFuture) {
      this.pnotify.error('Time to send must be more than five minutes in the future');
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
