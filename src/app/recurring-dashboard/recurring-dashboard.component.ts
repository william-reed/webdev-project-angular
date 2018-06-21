import {Component, OnInit} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';
import {AlertManager} from '../alert/alert.manager';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription';
import {UserService} from '../services/user.service';
import {log} from 'util';

@Component({
  selector: 'app-recurring-dashboard',
  templateUrl: './recurring-dashboard.component.html',
  styleUrls: ['./recurring-dashboard.component.css']
})
export class RecurringDashboardComponent implements OnInit {

  recurring: Recurring[] = [];
  selectedRecurring: Recurring = new Recurring();
  alertManager = new AlertManager();
  subscriptions: Subscription[];

  constructor(private recurringService: RecurringService,
              private subscriptionService: SubscriptionService,
              private userService: UserService) {
  }

  ngOnInit() {
    // add quotes to recurring
    this.recurringService.getAllRecurring()
      .then((res) => {
        this.recurring = res;
      });

    this.userService.loggedIn()
      .then(loggedIn => {
        if (loggedIn) {
          this.subscriptionService.getSubscriptionsForUser()
            .then((res) => this.subscriptions = res);
        }
      });
  }

  handleRecurringClicked(recurring) {
    this.selectedRecurring = recurring;
  }

  handleModalClose(event) {
    if (event) {
      this.alertManager.addSuccessAlert(event);
    }
    this.selectedRecurring = new Recurring();

    this.ngOnInit();
  }

  handleUnsubscribe(event) {
    this.ngOnInit();
    this.alertManager.addSuccessAlert('Unsubscribed from ' + event);
  }

  isUserSubscribed(recurring: Recurring) {
    if (this.subscriptions === undefined) {
      return;
    }
    return this.subscriptions.filter(sub => sub.recurringReminder === recurring.title)[0];
  }


}
