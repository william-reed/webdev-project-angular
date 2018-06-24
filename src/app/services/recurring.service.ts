import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RecurringService {

  getAllRecurring() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/recurring')
      .then((res) => res.json());
  }

  getExample(title: String) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/recurring/example/' + title)
      .then(res => res.text());
  }

  getRecurringByTitle(title: String) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/recurring/' + title)
      .then((res) => res.json());
  }
}
