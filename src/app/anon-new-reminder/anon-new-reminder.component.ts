import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {ReminderService} from '../services/reminder.service';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-anon-new-reminder',
  templateUrl: './anon-new-reminder.component.html',
  styleUrls: ['./anon-new-reminder.component.css']
})
export class AnonNewReminderComponent implements OnInit {

  anonUser: User = new User();
  carriers: String[];

  constructor(private carrierService: CarrierService, private reminderService: ReminderService) {
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => this.carriers = carriers);
  }

  addReminder(anonUser: User, reminder: Reminder): void {
    alert('Not completed for prototype');
    // some validation first
    //
    // let add = true;
    // if (!reminder.content) {
    //   alert('No reminder text given.');
    //   add = false;
    // }
    // if (!reminder.timeToSend) {
    //   alert('No date & time given.');
    //   add = false;
    // }
    // // TODO: validate date
    // if (!anonUser.phone) {
    //   alert('Phone number not given.');
    //   add = false;
    // } else if (anonUser.phone > 9999999999 || anonUser.phone <= 999999999) {
    //   alert('Illegal phone number entered. 9 digit phone number required.');
    //   add = false;
    // }
    // if (!anonUser.carrier) {
    //   alert('Carrier not given.');
    //   add = false;
    // }
    // if (!add) {
    //   return;
    // }
    //
    // this.reminderService.addAnonReminder(anonUser, reminder);
  }

}
