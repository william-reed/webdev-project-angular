import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(query: string) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/search/' + query,
      {
        method: 'POST'
      }).then((res) => res.json());
  }
}
