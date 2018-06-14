import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  login(username: String, password: String) {
    this.userService.login(username, password)
      .then((res) => {
        if (res) {
          console.log(res);
          this.router.navigate(['profile']);
        } else {
          alert('Invalid credentials given');
          console.log('error logging in');
        }
      });
  }

}
