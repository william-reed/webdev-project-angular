import {Component, OnInit} from '@angular/core';
import {CarrierService} from '../services/carrier.service';
import {Reminder} from '../models/reminder';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {AnonymousReminderService} from '../services/anonymous-reminder.service';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-anon-new-reminder',
  templateUrl: './anon-new-reminder.component.html',
  styleUrls: ['./anon-new-reminder.component.css']
})
export class AnonNewReminderComponent implements OnInit {

  anonymousReminder: AnonymousReminder = new AnonymousReminder();
  carriers: string[];
  pnotify;

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

  addReminder(anonymousReminder: AnonymousReminder, reminder: Reminder): void {
    // some validation first
    anonymousReminder.content = reminder.content;
    anonymousReminder.timeToSend = reminder.timeToSend;

    let add = true;
    if (!anonymousReminder.content) {
      this.pnotify.error('No reminder text given.');
      add = false;
    }
    if (!anonymousReminder.timeToSend) {
      this.pnotify.error('No date & time given.');
      add = false;
    }
    if (!anonymousReminder.phone) {
      this.pnotify.error('Phone number not given.');
      add = false;
    } else if (anonymousReminder.phone > 9999999999 || anonymousReminder.phone <= 999999999) {
      this.pnotify.error('Illegal phone number entered. 9 digit phone number required.');
      add = false;
    }
    if (!anonymousReminder.carrier) {
      this.pnotify.error('Carrier not given.');
      add = false;
    }
    const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    if (new Date(anonymousReminder.timeToSend) < fiveMinutesFuture) {
      this.pnotify.error('Time to send must be more than five minutes in the future');
      add = false;
    }
    if (!add) {
      return;
    }

    this.anonymousReminderService.addAnonymousReminder(anonymousReminder)
      .then(res => this.pnotify.success('Anonymous reminder added'));
  }

}
