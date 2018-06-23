import {Injectable} from '@angular/core';
import {AnonymousReminder} from '../models/anonymous-reminder';

@Injectable({
  providedIn: 'root'
})
export class AnonymousReminderService {

  constructor() {
  }

  addAnonymousReminder(reminder: AnonymousReminder) {
    return fetch('http://localhost:3000/api/anonymous-reminder', {
      body: JSON.stringify(reminder),
      credentials: 'include', // include, same-origin, *omit
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  getAllAnonymousReminders() {
    return fetch('http://localhost:3000/api/anonymous-reminder', {
      credentials: 'include', // include, same-origin, *omit
    }).then(res => res.json());
  }

  deleteAnonymousReminder(id) {
    return fetch('http://localhost:3000/api/anonymous-reminder/' + id, {
      method: 'DELETE',
      credentials: 'include', // include, same-origin, *omit
    }).then(res => res.json());
  }

}
