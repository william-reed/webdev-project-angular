import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from '../models/subscription';
import {SubscriptionService} from '../services/subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  @Input() subscriptions: Subscription[];
  @Output() unsubscribed = new EventEmitter();

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
  }

  unsubscribe(subscription: Subscription) {
    this.subscriptionService.deleteSubscription(subscription._id)
      .then(res => this.unsubscribed.emit(subscription.recurringReminder));
  }

}
