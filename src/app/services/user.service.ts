import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  login(username: String, password: String) {
    // TODO: does information match server?
    // probably return something to handle session and tell page to redirect to profile
    return true;
  }

  register(user: User) {
    // TODO: validate with server and return redirect
    return true;
  }

  update(user: User) {
    // TODO: just PUT to the server
    return true;
  }
}
