import {Injectable} from '@angular/core';
import {SMS_REMINDER_API} from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(query: string) {
    return fetch(SMS_REMINDER_API + '/api/search/' + query,
      {
        method: 'POST'
      }).then((res) => res.json());
  }
}
