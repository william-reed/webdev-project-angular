import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Reminder} from '../models/reminder';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {Subscription} from '../models/subscription';
import {UserService} from '../services/user.service';
import {AnonymousReminderService} from '../services/anonymous-reminder.service';
import {ReminderService} from '../services/reminder.service';
import {SubscriptionService} from '../services/subscription.service';
import {Router} from '@angular/router';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[];
  reminders: Reminder[];
  anonymousReminders: AnonymousReminder[];
  subscriptions: Subscription[];
  pnotify;

  constructor(private userService: UserService,
              private reminderService: ReminderService,
              private anonymousReminderService: AnonymousReminderService,
              private subscriptionService: SubscriptionService,
              private router: Router,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    // make sure they are actullay logged in and an admin

    this.userService.isAdmin()
      .then(isAdmin => {
        if (isAdmin) {
          this.getUsers();
          this.getReminders();
          this.getAnonymousReminders();
          this.getSubscriptions();
        } else {
          this.router.navigate(['login-register']);
        }
      });


  }

  getUsers() {
    this.userService.getAllUsers()
      .then(users => this.users = users);
  }

  editUser(user: User) {

  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id)
      .then(deletedUser => {
        this.users = this.users.filter(u => u._id !== deletedUser._id);
        this.pnotify.success('User deleted.');
      });

  }

  getReminders() {
    this.reminderService.getAllReminders()
      .then(reminders => this.reminders = reminders);
  }

  editReminder(reminder: Reminder) {

  }

  deleteReminder(reminder: Reminder) {

  }

  getAnonymousReminders() {
    this.anonymousReminderService.getAllAnonymousReminders()
      .then(anonymousReminders => this.anonymousReminders = anonymousReminders);
  }

  editAnonymousReminder(anonymousReminder: AnonymousReminder) {

  }

  deleteAnonymousReminder(anonymousReminder: AnonymousReminder) {

  }

  getSubscriptions() {
    this.subscriptionService.getAllSubscriptions()
      .then(subscriptions => this.subscriptions = subscriptions);
  }

  editSubscription(subscription: Subscription) {

  }

  deleteSubscription(subscription: Subscription) {

  }

}
