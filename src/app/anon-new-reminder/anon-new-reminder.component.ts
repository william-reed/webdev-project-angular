import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {AnonymousReminderService} from '../services/anonymous-reminder.service';
import {AlertManager} from '../alert/alert.manager';

@Component({
  selector: 'app-anon-new-reminder',
  templateUrl: './anon-new-reminder.component.html',
  styleUrls: ['./anon-new-reminder.component.css']
})
export class AnonNewReminderComponent implements OnInit {

  anonymousReminder: AnonymousReminder = new AnonymousReminder();
  alertManager = new AlertManager();
  carriers: String[];

  constructor(private carrierService: CarrierService,
              private anonymousReminderService: AnonymousReminderService) {
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
      this.alertManager.addDangerAlert('No reminder text given.');
      add = false;
    }
    if (!anonymousReminder.timeToSend) {
      this.alertManager.addDangerAlert('No date & time given.');
      add = false;
    }
    if (!anonymousReminder.phone) {
      this.alertManager.addDangerAlert('Phone number not given.');
      add = false;
    } else if (anonymousReminder.phone > 9999999999 || anonymousReminder.phone <= 999999999) {
      this.alertManager.addDangerAlert('Illegal phone number entered. 9 digit phone number required.');
      add = false;
    }
    if (!anonymousReminder.carrier) {
      this.alertManager.addDangerAlert('Carrier not given.');
      add = false;
    }
    const fiveMinutesFuture = new Date(new Date().getTime() + 5 * 60 * 1000);
    if (new Date(anonymousReminder.timeToSend) < fiveMinutesFuture) {
      this.alertManager.addWarningAlert('Time to send must be more than five minutes in the future');
      add = false;
    }
    if (!add) {
      return;
    }

    this.anonymousReminderService.addAnonymousReminder(anonymousReminder)
      .then(res => this.alertManager.addSuccessAlert('Anonymous reminder added'));
  }

}
