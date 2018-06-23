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
  currentUser = new User();

  reminders: Reminder[];
  currentReminder = new Reminder();

  anonymousReminders: AnonymousReminder[];
  currentAnonymousReminder = new AnonymousReminder();

  subscriptions: Subscription[];
  currentSubscription = new Subscription();

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
    this.currentUser = user;
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id)
      .then(deletedUser => {
        this.users = this.users.filter(u => u._id !== deletedUser._id);
        this.pnotify.success('User deleted.');
      });
  }

  handleUsersChanged(user) {
    this.currentUser = new User();
    this.getUsers();
  }

  getReminders() {
    this.reminderService.getAllReminders()
      .then(reminders =>
        this.reminders = reminders.map(r => Object.assign({}, r, {username: r.userId.username})));
  }

  editReminder(reminder: Reminder) {
    this.currentReminder = reminder;
    this.currentReminder.timeToSendString = this.currentReminder.timeToSend.toString().slice(0, 16);
  }

  deleteReminder(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder._id)
      .then(oldReminder => {
        this.reminders = this.reminders.filter(r => r._id !== reminder._id);
        this.pnotify.success('Reminder removed.');
      });
  }

  handleRemindersChanged(reminder) {
    this.currentReminder = new Reminder();
    this.getReminders();
  }

  getAnonymousReminders() {
    this.anonymousReminderService.getAllAnonymousReminders()
      .then(anonymousReminders => this.anonymousReminders = anonymousReminders);
  }

  editAnonymousReminder(anonymousReminder: AnonymousReminder) {
    this.currentAnonymousReminder = anonymousReminder;
    this.currentAnonymousReminder.timeToSendString = this.currentAnonymousReminder.timeToSend.toString().slice(0, 16);
  }

  handleAnonymousRemindersChanged(anonymousReminder) {
    this.currentAnonymousReminder = new AnonymousReminder();
    this.getAnonymousReminders();
  }

  deleteAnonymousReminder(anonymousReminder: AnonymousReminder) {
    this.anonymousReminderService.deleteAnonymousReminder(anonymousReminder._id)
      .then(oldReminder => {
        this.anonymousReminders = this.anonymousReminders.filter(r => r._id !== anonymousReminder._id);
        this.pnotify.success('Anonymous reminder removed.');
      });
  }

  getSubscriptions() {
    this.subscriptionService.getAllSubscriptions()
      .then(subscriptions =>
        this.subscriptions = subscriptions.map(s => Object.assign({}, s, {username: s.userId ? s.userId.username : ''})));
  }

  editSubscription(subscription: Subscription) {
    this.currentSubscription = subscription;
  }

  deleteSubscription(subscription: Subscription) {
    this.subscriptionService.deleteSubscription(subscription._id)
      .then(oldSubscription => {
        this.subscriptions = this.subscriptions.filter(s => s._id !== subscription._id);
        this.pnotify.success('Subscription removed.');
      });
  }

  handleSubscriptionsChanged(subscription) {
    this.currentSubscription = new Subscription();
    this.getSubscriptions();
  }

}
