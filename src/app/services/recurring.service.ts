import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RecurringService {

  getAllRecurring() {
    return fetch('http://localhost:3000/api/recurring')
      .then((res) => res.json());
  }

  getExample(title: String) {
    return fetch('http://localhost:3000/api/recurring/example/' + title)
      .then(res => res.text());
  }

  getRecurringByTitle(title: String) {
    return fetch('http://localhost:3000/api/recurring/' + title)
      .then((res) => res.json());
  }
}
