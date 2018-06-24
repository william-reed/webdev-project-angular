import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(query: string) {
    return fetch(process.env.SMS_REMINDER_API + '/api/search/' + query,
      {
        method: 'POST'
      }).then((res) => res.json());
  }
}
