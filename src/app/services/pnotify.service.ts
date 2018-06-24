import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';

@Injectable()
export class PNotifyService {
  getPNotify() {
    PNotify.defaults.styling = 'bootstrap4';
    return PNotify;
  }
}
