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
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return false;
      }
    });
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
      credentials: 'include',
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

  profile() {
    return fetch('http://localhost:3000/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      }).then(response => response.json());

  }
}
