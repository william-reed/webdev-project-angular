import {Component, Input, OnInit} from '@angular/core';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.css']
})
export class NewReminderComponent implements OnInit {

  @Input() newReminder = new Reminder();

  constructor() {
  }

  ngOnInit() {
  }

}
