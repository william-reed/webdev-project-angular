import {Component, OnInit} from '@angular/core';
import {CarrierService} from '../services/carrier.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  carriers: String[];

  constructor(private carrierService: CarrierService, private userService: UserService) {
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => this.carriers = carriers);
  }

  register(user: User) {
    this.userService.register(user);
  }

}
