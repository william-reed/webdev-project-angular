import {Injectable} from '@angular/core';
import {Reminder} from '../models/reminder';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() {
  }

  // utilizing promises to ease the eventual transition to async web events
  // mocking for now
  getReminders() {
    return fetch('http://localhost:3000/api/reminder', {
      credentials: 'include'
    }).then(response => response.json());
  }

  addReminder(reminder: Reminder) {
    return fetch('http://localhost:3000/api/reminder', {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  addAnonReminder(user: User, reminder: Reminder) {
    // TODO: create new user with this info and link reminder to it?
  }

  getRemindersForUser() {
    return fetch('http://localhost:3000/api/profile/reminders', {
      credentials: 'include'
    }).then(res => res.json());
  }

  deleteReminder(reminderId: string) {
    return fetch('http://localhost:3000/api/reminder/' + reminderId, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.text());
      } else {
        return;
      }
    });
  }
}
