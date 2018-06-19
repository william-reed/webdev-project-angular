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
  alertManager: AlertManager = new AlertManager();

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
        if (res) {
          this.user = res;
          this.alertManager.addAlert({type: 'success', text: 'Profile updated!'});
          // TODO: change to pretty banner
        } else {
          alert('Error occured updating profile.');
        }
      });
    // this.userService.update(this.user);
  }

  addReminder(reminder: Reminder) {
    alert('Not completed for prototype');

    // if (!reminder.content) {
    //   alert('Reminder text not given');
    //   return;
    // }
    // if (!reminder.timeToSend) {
    //   alert('Date and time not given');
    //   return;
    // }
    // this.reminderService.addReminder(reminder);
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
