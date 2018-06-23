import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Subscription} from '../models/subscription';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';

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

  constructor(private recurringService: RecurringService) {
  }

  ngOnInit() {
    this.recurringService.getAllRecurring()
      .then(recurring => this.recurring = recurring);
  }

}
