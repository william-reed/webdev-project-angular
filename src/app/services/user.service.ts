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
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.text());
      } else {
        return res.json();
      }
    });
  }

  logout() {
    return fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }

  register(user: User) {
    return fetch('http://localhost:3000/api/user', {
      body: JSON.stringify(user),
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.text());
      }
      return res.json();
    });
  }

  update(user: User) {
    return fetch('http://localhost:3000/api/user', {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  profile() {
    return fetch('http://localhost:3000/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      }).then(response => response.json());

  }

  loggedIn() {
    return fetch('http://localhost:3000/api/loggedin', {
      credentials: 'include'
    }).then((res) => res.json());
  }
}
