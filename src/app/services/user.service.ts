import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  login(username: String, password: String) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/login', {
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
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }

  register(user: User) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/user', {
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
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/user', {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  profile() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      }).then(response => response.json());

  }

  loggedIn() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/loggedin', {
      credentials: 'include'
    }).then(res => res.json());
  }

  getAllUsers() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/user', {
      credentials: 'include'
    }).then(res => res.json());
  }

  isAdmin() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/admin', {
      credentials: 'include'
    }).then(res => res.json());
  }

  deleteUser(userId) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/user/' + userId, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => res.json());
  }
}
