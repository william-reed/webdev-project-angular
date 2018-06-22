import {Component, OnInit} from '@angular/core';
import {CarrierService} from '../services/carrier.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertManager} from '../alert/alert.manager';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  carriers: string[];
  alertManager: AlertManager = new AlertManager();

  constructor(private carrierService: CarrierService,
              private userService: UserService,
              private router: Router) {
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
      this.alertManager.addDangerAlert('No username provided');
      return;
    }
    if (!user.password) {
      this.alertManager.addDangerAlert('No password provided');
      return;
    }
    if (!user.phone) {
      this.alertManager.addDangerAlert('No phone provided');
      return;
    } else if (user.phone > 9999999999 || user.phone <= 999999999) {
      this.alertManager.addDangerAlert('Illegal phone number entered. 9 digit phone number required.');
      return;
    }
    if (!user.carrier) {
      this.alertManager.addDangerAlert('No carrier provided');
      return;
    }

    this.userService.register(user)
      .then((res) => this.router.navigate(['profile']))
      .catch(rej => rej.then(error => this.alertManager.addDangerAlert(error)));
  }

}
