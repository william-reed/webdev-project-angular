import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {UserService} from '../services/user.service';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';
import {Router} from '@angular/router';
import {Alert} from '../models/alert';
import {AlertManager} from '../alert/alert.manager';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  carriers: String[];
  reminders: Reminder[] = [];
  profileAlertManager: AlertManager = new AlertManager();
  reminderAlertManager: AlertManager = new AlertManager();

  constructor(private carrierService: CarrierService, private userService: UserService,
              private reminderService: ReminderService, private router: Router) {
  }

  ngOnInit() {
    // are we actually logged in?
    this.userService.loggedIn()
      .then((res) => {
        if (res) {
          this.getProfile();
          this.getCarriers();
          this.getReminders();
        } else {
          this.router.navigate(['login-register']);
        }
      });

  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => this.carriers = carriers);
  }

  updateUser() {
    this.userService.update(this.user)
      .then((res) => {
        this.user = res;
        this.profileAlertManager.addSuccessAlert('Profile updated!');
      }).catch(rej =>
      this.profileAlertManager.addDangerAlert('Error occurred updating your profile: ' + rej));
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
    this.reminderService.addReminder(reminder)
      .then((res) => {
        this.reminderAlertManager.addSuccessAlert('Reminder added!');
        this.reminders.push(res);
      }).catch(rej =>
      this.reminderAlertManager.addDangerAlert('Error occurred adding alert: ' + rej));
  }

  getReminders() {
    this.reminderService.getRemindersForUser().then((reminders) => this.reminders = reminders);
  }

  getProfile() {
    this.userService.profile().then(user => this.user = user);
  }

  logout() {
    this.userService.logout().then(() => this.router.navigate(['login-register']));
  }

}
