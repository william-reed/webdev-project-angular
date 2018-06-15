import {Component, Input, OnInit} from '@angular/core';
import {Recurring} from '../models/recurring';

@Component({
  selector: 'app-recurring-card',
  templateUrl: './recurring-card.component.html',
  styleUrls: ['./recurring-card.component.css']
})
export class RecurringCardComponent implements OnInit {

  @Input() recurring: Recurring;

  ngOnInit() {
  }

}
