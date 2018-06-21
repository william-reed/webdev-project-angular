import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Recurring} from '../models/recurring';

declare var $: any;

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnInit, OnChanges {

  @Input() recurring: Recurring = new Recurring();
  @Output() onClose = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.recurring && changes.recurring.firstChange) {
      return;
    }
    this.openModal();
  }

  openModal() {
    $('#subscriptionModal').modal('show');
  }

  closeModal() {
    $('#subscriptionModal').modal('hide');
    this.onClose.emit();
  }

  subscribe() {
    // check date is entered
    console.log('subscribe to recurring clicked');
  }

}





