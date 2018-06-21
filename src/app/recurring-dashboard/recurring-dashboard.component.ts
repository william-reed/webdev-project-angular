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
  selectedRecurring: Recurring = new Recurring();

  constructor(private recurringService: RecurringService) {
  }

  ngOnInit() {
    // add quotes to recurring
    this.recurringService.getAllRecurring()
      .then((res) => {
        this.recurring = res;
      });
  }

  handleRecurringClicked(recurring) {
    this.selectedRecurring = recurring;
  }

  handleModalClose() {
    this.selectedRecurring = new Recurring();
  }

}
