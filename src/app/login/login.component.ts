import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Alert} from '../models/alert';
import {AlertManager} from '../alert/alert.manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  alertManager: AlertManager = new AlertManager();

  constructor(private userService: UserService, private router: Router) {
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
      .catch(rej => rej.then(error => this.alertManager.addDangerAlert(error)));
  }

}
