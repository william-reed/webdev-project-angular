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
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  register(user: User) {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/user', {
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
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      }).then(response => response.json());

  }

  loggedIn() {
    return fetch('https://wrr-webdev-project-node.herokuapp.com/api/loggedin', {
      credentials: 'include'
    }).then((res) => res.json());
  }
}
