import {Injectable} from '@angular/core';
import {Subscription} from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() {
  }

  getSubscriptions() {
    return fetch('http://localhost:3000/api/subscription', {
      credentials: 'include'
    }).then(response => response.json());
  }

  addSubscription(subscription: Subscription) {
    return fetch('http://localhost:3000/api/subscription', {
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
    return fetch('http://localhost:3000/api/profile/subscriptions', {
      credentials: 'include'
    }).then(res => res.json());
  }

  updateSubscription(subscription: Subscription) {
    return fetch('http://localhost:3000/api/subscription/' + subscription._id, {
      body: JSON.stringify(subscription),
      credentials: 'include',
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  deleteSubscription(subscriptionId: string) {
    return fetch('http://localhost:3000/api/subscription/' + subscriptionId, {
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
    return fetch('http://localhost:3000/api/subscription')
      .then(res => res.json());
  }
}
