import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Recurring} from '../models/recurring';
import {Subscription} from '../models/subscription';
import {SubscriptionService} from '../services/subscription.service';
import {PNotifyService} from '../services/pnotify.service';

declare var $: any;

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnInit, OnChanges {

  @Input() recurring: Recurring = new Recurring();
  @Output() closeModalEvent = new EventEmitter();
  subscription: Subscription = new Subscription();
  pnotify;

  constructor(private subscriptionService: SubscriptionService,
              private pnotifyService: PNotifyService) {
    this.pnotify = pnotifyService.getPNotify();
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

  closeModal(emitEvent = true) {
    if (emitEvent) {
      this.closeModalEvent.emit();
    }
    this.pnotify.removeAll();
    this.subscription = new Subscription();
    $('#subscriptionModal').modal('hide');
  }

  subscribe() {
    // check date is entered
    if (!this.subscription.timeToSend) {
      this.pnotify.error('A full time must be entered');
      return;
    }
    this.subscription.recurringReminder = this.recurring.title;

    // subscribe them
    this.subscriptionService.addSubscription(this.subscription)
      .then((res) => {
        this.closeModalEvent.emit('Subscription created');
        this.closeModal(false);
      })
      .catch(res => res.then(err => this.pnotify.error('Error occured: ' + err)));
  }

}





