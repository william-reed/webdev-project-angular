import {Component, OnInit} from '@angular/core';
import {AlertManager} from '../alert/alert.manager';
import {User} from '../models/user';
import {Reminder} from '../models/reminder';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {Subscription} from '../models/subscription';
import {UserService} from '../services/user.service';
import {AnonymousReminderService} from '../services/anonymous-reminder.service';
import {ReminderService} from '../services/reminder.service';
import {SubscriptionService} from '../services/subscription.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  alertManager = new AlertManager();
  users: User[];
  reminders: Reminder[];
  anonymousReminders: AnonymousReminder[];
  subscriptions: Subscription[];

  constructor(private userService: UserService,
              private reminderService: ReminderService,
              private anonymousReminderService: AnonymousReminderService,
              private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    // make sure they are actullay logged in and an admin
  }

  getUsers() {
  }

  editUser(user: User) {

  }

  deleteUser(user: User) {

  }

  getReminders() {

  }

  editReminder(reminder: Reminder) {

  }

  deleteReminder(reminder: Reminder) {

  }

  getAnonymousReminders() {

  }

  editAnonymousReminder(anonymousReminder: AnonymousReminder) {

  }

  deleteAnonymousReminder(anonymousReminder: AnonymousReminder) {

  }

  getSubscriptions() {

  }

  editSubscription(subscription: Subscription) {

  }

  deleteSubscription(subscription: Subscription) {

  }

}
