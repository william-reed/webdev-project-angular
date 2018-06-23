import {Component, Input, OnInit} from '@angular/core';
import {AnonymousReminder} from '../models/anonymous-reminder';
import {CarrierService} from '../services/carrier.service';

@Component({
  selector: 'app-admin-anon-reminder-input',
  templateUrl: './admin-anon-reminder-input.component.html',
  styleUrls: ['./admin-anon-reminder-input.component.css']
})
export class AdminAnonReminderInputComponent implements OnInit {
  @Input() create = true;
  @Input() anonymousReminder: AnonymousReminder = new AnonymousReminder();
  carriers: string[];

  constructor(private carrierService: CarrierService) {
  }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().then((carriers) => {
      this.carriers = carriers;
      this.anonymousReminder.carrier = this.carriers[0];
    });
  }

}
