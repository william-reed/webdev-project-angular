import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../models/user';
import {Subscription} from '../models/subscription';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';
import {PNotifyService} from '../services/pnotify.service';
import {SubscriptionService} from '../services/subscription.service';

@Component({
  selector: 'app-admin-subscription-input',
  templateUrl: './admin-subscription-input.component.html',
  styleUrls: ['./admin-subscription-input.component.css']
})
export class AdminSubscriptionInputComponent implements OnInit {
  @Input() users: User[];
  @Input() create = true;
  @Input() subscription: Subscription = new Subscription();
  recurring: Recurring;

  pnotify;
  @Output() subscriptionsChanged = new EventEmitter();

  constructor(private recurringService: RecurringService,
              private subscriptionService: SubscriptionService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.recurringService.getAllRecurring()
      .then(recurring => this.recurring = recurring);
  }

  submit() {
    if (this.create) {
      this.createReminder();
    } else {
      this.updateReminder();
    }
  }

  createReminder() {
    if (!this.validateInput()) {
      return;
    }
    this.subscriptionService.addSubscription(this.subscription)
      .then((res) => {
        this.pnotify.success('Subscription created');
        this.subscriptionsChanged.emit(this.subscription);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));
  }

  updateReminder() {
    if (!this.validateInput()) {
      return;
    }
    this.subscriptionService.updateSubscription(this.subscription)
      .then((res) => {
        this.pnotify.success('Subscription updated');
        this.subscriptionsChanged.emit(this.subscription);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));

  }

  validateInput(): boolean {
    if (!this.subscription.userId) {
      this.pnotify.error('User not selected');
      return false;
    }
    if (!this.subscription.recurringReminder) {
      this.pnotify.error('Subscription not selected');
      return false;
    }
    if (!this.subscription.timeToSend) {
      this.pnotify.error('Time not given');
      return false;
    }
    return true;
  }
}
