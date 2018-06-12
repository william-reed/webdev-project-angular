import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
