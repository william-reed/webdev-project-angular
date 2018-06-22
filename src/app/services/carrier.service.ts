import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  carriers: string[] = ['Sprint', 'Verizon', 'AT&T', 'T-Mobile'];

  constructor() {
  }

  // utilizing promises to ease the eventual transition to async web events
  // mocking for now
  getCarriers() {
    return Promise.resolve(this.carriers);
  }
}
