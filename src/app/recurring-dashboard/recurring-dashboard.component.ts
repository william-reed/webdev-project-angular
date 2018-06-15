import {Component, OnInit} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';

@Component({
  selector: 'app-recurring-dashboard',
  templateUrl: './recurring-dashboard.component.html',
  styleUrls: ['./recurring-dashboard.component.css']
})
export class RecurringDashboardComponent implements OnInit {

  recurring: Recurring[] = [];

  constructor(private recurringService: RecurringService) {
  }

  ngOnInit() {
    // add quotes to recurring
    this.recurringService.getRecurring()
      .then((res) => {
        this.recurring = res;
      });
  }

}
