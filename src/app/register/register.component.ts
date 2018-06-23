import {Component, OnInit} from '@angular/core';
import {CarrierService} from '../services/carrier.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {PNotifyService} from '../services/pnotify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  carriers: string[];
  pnotify;

  constructor(private carrierService: CarrierService,
              private userService: UserService,
              private router: Router,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => {
      this.carriers = carriers;
      this.user.carrier = carriers[0];
    });
  }

  register(user: User) {
    if (!user.username) {
      this.pnotify.error('No username provided');
      return;
    }
    if (!user.password) {
      this.pnotify.error('No password provided');
      return;
    }
    if (!user.phone) {
      this.pnotify.error('No phone provided');
      return;
    } else if (user.phone > 9999999999 || user.phone <= 999999999) {
      this.pnotify.error('Illegal phone number entered. 9 digit phone number required.');
      return;
    }
    if (!user.carrier) {
      this.pnotify.error('No carrier provided');
      return;
    }

    this.userService.register(user)
      .then((res) => this.router.navigate(['profile']))
      .catch(rej => rej.then(error => this.pnotify.error(error)));
  }

}
