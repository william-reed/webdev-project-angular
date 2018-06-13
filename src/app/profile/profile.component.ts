import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {UserService} from '../services/user.service';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  carriers: String[];
  reminders: Reminder[] = [];

  constructor(private carrierService: CarrierService, private userService: UserService,
              private reminderService: ReminderService) {
  }

  ngOnInit() {
    this.getCarriers();
    this.getReminders();
  }

  getCarriers(): void {
    console.log('get carriers');
    this.carrierService.getCarriers().then((carriers) => this.carriers = carriers);
  }

  updateUser() {
    this.userService.update(this.user);
  }

  addReminder(reminder: Reminder) {
    if (!reminder.content) {
      alert('Reminder text not given');
      return;
    }
    if (!reminder.timeToSend) {
      alert('Date and time not given');
      return;
    }
    this.reminderService.addReminder(reminder);
  }

  getReminders() {
    this.reminderService.getRemindersForUser().then((reminders) => this.reminders = reminders);
  }

}
