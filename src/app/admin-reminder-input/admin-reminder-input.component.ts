import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Reminder} from '../models/reminder';

@Component({
  selector: 'app-admin-reminder-input',
  templateUrl: './admin-reminder-input.component.html',
  styleUrls: ['./admin-reminder-input.component.css']
})
export class AdminReminderInputComponent implements OnInit {
  @Input() reminder = new Reminder();
  @Input() create = true;
  @Input() users = [];

  constructor() {
  }

  ngOnInit() {
  }

}
