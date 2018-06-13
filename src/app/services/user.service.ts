import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  login(username: String, password: String) {
    return fetch('http://localhost:3000/api/login', {
      body: JSON.stringify({username, password}),
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });

    // TODO: does information match server?
    // probably return something to handle session and tell page to redirect to profile
  }

  logout() {
    return fetch('http://localhost:3000/api/logout', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  register(user: User) {
    return fetch('http://localhost:3000/api/user', {
      body: JSON.stringify(user),
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
    // TODO: redirect
  }

  update(user: User) {
    // TODO: just PUT to the server
    return true;
  }
}
