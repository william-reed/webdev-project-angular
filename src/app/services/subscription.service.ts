import {Injectable} from '@angular/core';
import {Subscription} from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() {
  }

  getSubscriptions() {
    return fetch(process.env.SMS_REMINDER_API + '/api/subscription', {
      credentials: 'include'
    }).then(response => response.json());
  }

  addSubscription(subscription: Subscription) {
    return fetch(process.env.SMS_REMINDER_API + '/api/subscription', {
      body: JSON.stringify(subscription),
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.text());
      } else {
        return res.json();
      }
    });
  }

  getSubscriptionsForUser() {
    return fetch(process.env.SMS_REMINDER_API + '/api/profile/subscriptions', {
      credentials: 'include'
    }).then(res => res.json());
  }

  updateSubscription(subscription: Subscription) {
    return fetch(process.env.SMS_REMINDER_API + '/api/subscription/' + subscription._id, {
      body: JSON.stringify(subscription),
      credentials: 'include',
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  deleteSubscription(subscriptionId: string) {
    return fetch(process.env.SMS_REMINDER_API + '/api/subscription/' + subscriptionId, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.text());
      } else {
        return;
      }
    });
  }

  getAllSubscriptions() {
    return fetch(process.env.SMS_REMINDER_API + '/api/subscription', {
      credentials: 'include', // include, same-origin, *omit
    }).then(res => res.json());
  }
}
