import {Injectable} from '@angular/core';
import {SMS_REMINDER_API} from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class RecurringService {

  getAllRecurring() {
    return fetch(SMS_REMINDER_API + '/api/recurring')
      .then((res) => res.json());
  }

  getExample(title: String) {
    return fetch(SMS_REMINDER_API + '/api/recurring/example/' + title)
      .then(res => res.text());
  }

  getRecurringByTitle(title: String) {
    return fetch(SMS_REMINDER_API + '/api/recurring/' + title)
      .then((res) => res.json());
  }
}
