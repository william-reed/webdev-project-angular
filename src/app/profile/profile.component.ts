import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {UserService} from '../services/user.service';
import {Reminder} from '../models/reminder';
import {ReminderService} from '../services/reminder.service';
import {Router} from '@angular/router';
import {Subscription} from '../models/subscription';
import {SubscriptionService} from '../services/subscription.service';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  carriers: String[];
  reminders: Reminder[] = [];
  subscriptions: Subscription[] = [];
  pnotify;

  constructor(private carrierService: CarrierService,
              private userService: UserService,
              private reminderService: ReminderService,
              private subscriptionService: SubscriptionService,
              private router: Router,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    console.log('ngoninit');
    // are we actually logged in?
    this.userService.loggedIn()
      .then((loggedIn) => {
        console.log(loggedIn);
        if (loggedIn) {
          this.getProfile();
          this.getCarriers();
          this.getReminders();
          this.getSubscriptions();
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
        this.pnotify.success('Profile updated!');
      }).catch(rej =>
      this.pnotify.error('Error occurred updating your profile: ' + rej));
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
    this.reminderService.addReminder(reminder)
      .then((res) => {
        this.pnotify.error('Reminder added!');
        this.reminders.push(res);
        this.getReminders();
      }).catch(rej =>
      this.pnotify.error('Error occurred adding alert: ' + rej));
  }

  getReminders() {
    this.reminderService.getRemindersForUser().then(reminders => this.reminders = reminders);
  }

  getSubscriptions() {
    this.subscriptionService.getSubscriptionsForUser().then(subscriptions => this.subscriptions = subscriptions);
  }

  getProfile() {
    this.userService.profile().then(user => this.user = user);
  }

  logout() {
    this.userService.logout().then(() => this.router.navigate(['login-register']));
  }

  handleUnsubscribe(subTitle: string) {
    this.pnotify.success(subTitle + ' unsubscribed');

    this.subscriptions = this.subscriptions.filter(sub => sub.recurringReminder !== subTitle);
  }

}
