import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recurring} from '../models/recurring';
import {RecurringService} from '../services/recurring.service';

@Component({
  selector: 'app-recurring-card',
  templateUrl: './recurring-card.component.html',
  styleUrls: ['./recurring-card.component.css']
})
export class RecurringCardComponent implements OnInit {

  @Input() recurring: Recurring = new Recurring();
  @Output() recurringClicked = new EventEmitter();

  constructor(private recurringService: RecurringService) {
  }

  ngOnInit() {
  }

  preview() {
    this.recurringService.getExample(this.recurring.title).then((res) => {
      alert(res);
    });
  }

  subscribe() {
    this.recurringClicked.emit(this.recurring);
  }

}
