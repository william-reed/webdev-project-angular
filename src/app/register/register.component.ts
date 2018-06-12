import {Component, OnInit} from '@angular/core';
import {CarrierService} from '../services/carrier.service';
import {User} from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  carriers: String[];

  constructor(private carrierService: CarrierService) {
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    console.log('get carriers');
    this.carrierService.getCarriers().then((carriers) => this.carriers = carriers);
  }

}
