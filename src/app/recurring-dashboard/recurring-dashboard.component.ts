import {Component, OnInit} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription';
import {UserService} from '../services/user.service';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-recurring-dashboard',
  templateUrl: './recurring-dashboard.component.html',
  styleUrls: ['./recurring-dashboard.component.css']
})
export class RecurringDashboardComponent implements OnInit {

  recurring: Recurring[] = [];
  selectedRecurring: Recurring = new Recurring();
  subscriptions: Subscription[];

  previewTitle = '';
  previewText = '';
  pnotify;

  constructor(private recurringService: RecurringService,
              private subscriptionService: SubscriptionService,
              private userService: UserService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
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
      this.pnotify.success(event);
    }
    this.selectedRecurring = new Recurring();

    this.ngOnInit();
  }

  handleUnsubscribe(event) {
    this.ngOnInit();
    this.pnotify.success('Unsubscribed from ' + event);
  }

  handlePreviewClicked(recurring) {
    this.recurringService.getExample(recurring.title).then((res) => {
      this.previewText = res;
      this.previewTitle = recurring.title;
    });
  }

  isUserSubscribed(recurring: Recurring) {
    if (this.subscriptions === undefined) {
      return;
    }
    return this.subscriptions.filter(sub => sub.recurringReminder === recurring.title)[0];
  }


}
