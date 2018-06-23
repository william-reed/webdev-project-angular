import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  pnotify;

  constructor(private userService: UserService, private router: Router,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }


  ngOnInit() {
    // redirect to profile if logged in
    this.userService.loggedIn()
      .then((res) => {
        if (res) {
          this.router.navigate(['profile']);
        }
      });
  }

  login(username: String, password: String) {
    this.userService.login(username, password)
      .then((res) => this.router.navigate(['profile']))
      .catch(rej => rej.then(error => this.pnotify.error(error)));
  }

}
