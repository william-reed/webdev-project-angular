import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-anon-new-reminder',
  templateUrl: './anon-new-reminder.component.html',
  styleUrls: ['./anon-new-reminder.component.css']
})
export class AnonNewReminderComponent implements OnInit {

  anonUser: User = new User();

  constructor() {
  }

  ngOnInit() {
  }

}
