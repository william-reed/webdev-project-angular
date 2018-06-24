import {Injectable} from '@angular/core';
import {Reminder} from '../models/reminder';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() {
  }

  getAllReminders() {
    return fetch(process.env.SMS_REMINDER_API + '/api/reminder', {
      credentials: 'include'
    }).then(response => response.json());
  }

  getRandomReminders() {
    return fetch(process.env.SMS_REMINDER_API + '/api/reminder/random')
      .then(res => res.json());
  }

  addReminder(reminder: Reminder) {
    return fetch(process.env.SMS_REMINDER_API + '/api/reminder', {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  getRemindersForUser() {
    return fetch(process.env.SMS_REMINDER_API + '/api/profile/reminders', {
      credentials: 'include'
    }).then(res => res.json());
  }

  updateReminder(reminder: Reminder) {
    return fetch(process.env.SMS_REMINDER_API + '/api/reminder/' + reminder._id, {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  deleteReminder(reminderId: string) {
    return fetch(process.env.SMS_REMINDER_API + '/api/reminder/' + reminderId, {
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
