import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription';

@Component({
  selector: 'app-recurring-card',
  templateUrl: './recurring-card.component.html',
  styleUrls: ['./recurring-card.component.css']
})
export class RecurringCardComponent implements OnInit {

  @Input() recurring: Recurring = new Recurring();
  @Input() subscription: Subscription;

  @Output() recurringClicked = new EventEmitter();
  @Output() unsubscribeClicked = new EventEmitter();
  @Output() previewClicked = new EventEmitter();

  constructor(private recurringService: RecurringService,
              private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
  }

  preview() {
    this.previewClicked.emit(this.recurring);
  }

  subscribe() {
    this.recurringClicked.emit(this.recurring);
  }

  unsubscribe() {
    this.subscriptionService.deleteSubscription(this.subscription._id)
      .then(res => this.unsubscribeClicked.emit(this.recurring.title));
  }

}
