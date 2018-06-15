import {Component, Input, OnInit} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';

@Component({
  selector: 'app-recurring-card',
  templateUrl: './recurring-card.component.html',
  styleUrls: ['./recurring-card.component.css']
})
export class RecurringCardComponent implements OnInit {

  @Input() recurring: Recurring;

  constructor(private recurringService: RecurringService) {
  }

  ngOnInit() {
  }

  preview() {
    this.recurringService.getExample(this.recurring.title).then((res) => {
      alert(res);
    });
  }

}
