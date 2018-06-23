import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../models/user';
import {CarrierService} from '../services/carrier.service';
import {UserService} from '../services/user.service';
import {PNotifyService} from '../services/pnotify.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-admin-user-input',
  templateUrl: './admin-user-input.component.html',
  styleUrls: ['./admin-user-input.component.css']
})
export class AdminUserInputComponent implements OnInit {
  @Input() user = new User();
  carriers: string[];
  @Input() create = true;
  pnotify;

  @Output() usersChanged = new EventEmitter();

  constructor(private carrierService: CarrierService,
              private userService: UserService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
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

  submit() {
    if (this.create) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    if (!this.validateInput()) {
      return;
    }

    this.userService.register(this.user)
      .then((res) => {
        this.pnotify.success('User created');
        this.usersChanged.emit(this.user);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));
  }

  updateUser() {
    if (!this.validateInput()) {
      return;
    }
    this.userService.update(this.user)
      .then((res) => {
        this.pnotify.success('User updated');
        this.usersChanged.emit(this.user);
      })
      .catch(rej => rej.then(err => this.pnotify.error(err)));
  }

  validateInput(): boolean {
    if (!this.user.username) {
      this.pnotify.error('No username provided');
      return false;
    }
    if (!this.user.password) {
      this.pnotify.error('No password provided');
      return false;
    }
    if (!this.user.phone) {
      this.pnotify.error('No phone provided');
      return false;
    } else if (this.user.phone > 9999999999 || this.user.phone <= 999999999) {
      this.pnotify.error('Illegal phone number entered. 9 digit phone number required.');
      return false;
    }
    if (!this.user.carrier) {
      this.pnotify.error('No carrier provided');
      return false;
    }
    return true;
  }

}
