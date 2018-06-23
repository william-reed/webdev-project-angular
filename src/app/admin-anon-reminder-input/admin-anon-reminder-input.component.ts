import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {CarrierService} from '../services/carrier.service';
import {AnonymousReminderService} from '../services/anonymous-reminder.service';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-admin-anon-reminder-input',
  templateUrl: './admin-anon-reminder-input.component.html',
  styleUrls: ['./admin-anon-reminder-input.component.css']
})
export class AdminAnonReminderInputComponent implements OnInit {
  @Input() create = true;
  @Input() anonymousReminder: AnonymousReminder = new AnonymousReminder();
  carriers: string[];
  pnotify;

  @Output() anonymousRemindersChanged = new EventEmitter();

  constructor(private carrierService: CarrierService,
              private anonymousReminderService: AnonymousReminderService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => {
      this.carriers = carriers;
      this.anonymousReminder.carrier = this.carriers[0];
    });
  }

  submit() {
    if (this.create) {
      this.createReminder();
    } else {
      this.updateReminder();
    }
  }

  createReminder() {
    this.anonymousReminder.timeToSend = new Date(this.anonymousReminder.timeToSendString);
    if (!this.validateInput()) {
      return;
    }

    this.anonymousReminderService.addAnonymousReminder(this.anonymousReminder)
      .then((res) => {
        this.pnotify.success('Reminder created');
        this.anonymousRemindersChanged.emit(this.anonymousReminder);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));
  }

  updateReminder() {
    this.anonymousReminder.timeToSend = new Date(this.anonymousReminder.timeToSendString);
    if (!this.validateInput()) {
      return;
    }
    this.anonymousReminderService.updateAnonymousReminder(this.anonymousReminder)
      .then((res) => {
        this.pnotify.success('Reminder updated');
        this.anonymousRemindersChanged.emit(this.anonymousReminder);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));

  }

  validateInput(): boolean {
    if (!this.anonymousReminder.content) {
      this.pnotify.error('Reminder message not given');
      return false;
    }
    if (!this.anonymousReminder.phone) {
      this.pnotify.error('Phone number not given');
      return false;
    }
    if (!this.anonymousReminder.timeToSendString) {
      this.pnotify.error('Reminder date not given');
      return false;
    }
    const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    if (new Date(this.anonymousReminder.timeToSend) < fiveMinutesFuture) {
      this.pnotify.error('Time to send must be more than five minutes in the future');
      return false;
    }
    return true;
  }


}
