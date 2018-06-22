import {Component, OnInit} from '@angular/core';
import {Reminder} from '../models/reminder';
import {Recurring} from '../models/recurring';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';
import {UserService} from '../services/user.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription';
import {AlertManager} from '../alert/alert.manager';
import {RecurringService} from '../services/recurring.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  reminders: Reminder[] = [];
  recurring: Recurring[] = [];
  subscriptions: Subscription[];
  selectedRecurring: Recurring = new Recurring();
  query = '';
  alertManager = new AlertManager();
  selectedReminder = new Reminder();

  previewTitle = '';
  previewText = '';

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private userService: UserService,
              private subscriptionService: SubscriptionService,
              private recurringService: RecurringService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.query = this.route.snapshot.paramMap.get('text');
      this.searchService.search(this.query)
        .then((res) => {
          this.reminders = res.reminders;
          this.recurring = res.recurring;

          this.getSubscriptions();
        });
    });
  }

  getSubscriptions() {
    this.userService.loggedIn()
      .then(loggedIn => {
        if (loggedIn) {
          this.subscriptionService.getSubscriptionsForUser()
            .then((res) => this.subscriptions = res);
        }
      });
  }

  isUserSubscribed(recurring: Recurring) {
    if (this.subscriptions === undefined) {
      return;
    }
    return this.subscriptions.filter(sub => sub.recurringReminder === recurring.title)[0];
  }

  handleRecurringClicked(recurring) {
    this.selectedRecurring = recurring;
  }

  handleUnsubscribe(event) {
    this.ngOnInit();
    this.alertManager.addSuccessAlert('Unsubscribed from ' + event);
  }

  handlePreviewClicked(recurring) {
    this.recurringService.getExample(recurring.title).then((res) => {
      this.previewText = res;
      this.previewTitle = recurring.title;
    });
  }

  handleSubscriptionModalClose(event) {
    if (event) {
      this.alertManager.addSuccessAlert(event);
    }
    this.selectedRecurring = new Recurring();

    this.ngOnInit();
  }

  handleReminderModalClose(event) {
    if (event.includes('Error')) {
      this.alertManager.addDangerAlert(event);
    } else {
      this.alertManager.addSuccessAlert(event);
    }
  }

  handleAddReminder(event) {
    this.selectedReminder = event;
  }

}
