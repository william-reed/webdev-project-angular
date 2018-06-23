import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';

@Component({
  selector: 'app-admin-user-input',
  templateUrl: './admin-user-input.component.html',
  styleUrls: ['./admin-user-input.component.css']
})
export class AdminUserInputComponent implements OnInit {
  @Input() user = new User();
  carriers: string[];
  @Input() create = true;

  constructor(private carrierService: CarrierService) {
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => {
      this.carriers = carriers;
      this.user.carrier = this.carriers[0];
    });
  }

}
