import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {SMS_REMINDER_API} from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  login(username: String, password: String) {
    return fetch(SMS_REMINDER_API + '/api/login', {
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
    return fetch(SMS_REMINDER_API + '/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }

  register(user: User) {
    return fetch(SMS_REMINDER_API + '/api/user', {
      body: JSON.stringify(user),
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

  update(user: User) {
    return fetch(SMS_REMINDER_API + '/api/user', {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  profile() {
    return fetch(SMS_REMINDER_API + '/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      }).then(response => response.json());

  }

  loggedIn() {
    return fetch(SMS_REMINDER_API + '/api/loggedin', {
      credentials: 'include'
    }).then(res => res.json());
  }

  getAllUsers() {
    return fetch(SMS_REMINDER_API + '/api/user', {
      credentials: 'include'
    }).then(res => res.json());
  }

  isAdmin() {
    return fetch(SMS_REMINDER_API + '/api/admin', {
      credentials: 'include'
    }).then(res => res.json());
  }

  deleteUser(userId) {
    return fetch(SMS_REMINDER_API + '/api/user/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => res.json());
  }
}
