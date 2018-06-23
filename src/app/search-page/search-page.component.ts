import {Component, OnInit} from '@angular/core';
import {Reminder} from '../models/reminder';
import {Recurring} from '../models/recurring';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';
import {UserService} from '../services/user.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription';
import {RecurringService} from '../services/recurring.service';
import {PNotifyService} from '../services/pnotify.service';

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
  selectedReminder = new Reminder();

  previewTitle = '';
  previewText = '';
  pnotify;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private userService: UserService,
              private subscriptionService: SubscriptionService,
              private recurringService: RecurringService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
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
    this.pnotify.success('Unsubscribed from ' + event);
  }

  handlePreviewClicked(recurring) {
    this.recurringService.getExample(recurring.title).then((res) => {
      this.previewText = res;
      this.previewTitle = recurring.title;
    });
  }

  handleSubscriptionModalClose(event) {
    if (event) {
      this.pnotify.success(event);
    }
    this.selectedRecurring = new Recurring();

    this.ngOnInit();
  }

  handleReminderModalClose(event) {
    if (event.includes('Error')) {
      this.pnotify.error(event);
    } else {
      this.pnotify.success(event);
    }
  }

  handleAddReminder(event) {
    this.selectedReminder = event;
  }

}
