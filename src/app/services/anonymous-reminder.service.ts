import {Injectable} from '@angular/core';
import {AnonymousReminder} from '../models/anonymous-reminder';

@Injectable({
  providedIn: 'root'
})
export class AnonymousReminderService {

  constructor() {
  }

  addAnonymousReminder(reminder: AnonymousReminder) {
    return fetch(process.env.SMS_REMINDER_API + '/api/anonymous-reminder', {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  getAllAnonymousReminders() {
    return fetch(process.env.SMS_REMINDER_API + '/api/anonymous-reminder', {
      credentials: 'include', // include, same-origin, *omit
    }).then(res => res.json());
  }

  deleteAnonymousReminder(id) {
    return fetch(process.env.SMS_REMINDER_API + '/api/anonymous-reminder/' + id, {
      method: 'DELETE',
      credentials: 'include', // include, same-origin, *omit
    }).then(res => res.json());
  }

  updateAnonymousReminder(reminder: AnonymousReminder) {
    return fetch(process.env.SMS_REMINDER_API + '/api/anonymous-reminder/' + reminder._id, {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

}
