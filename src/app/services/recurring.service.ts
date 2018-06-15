import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Recurring} from '../models/recurring';

@Injectable({
  providedIn: 'root'
})
export class RecurringService {

  recurring: Recurring[] = [
    {
      title: 'Quotes',
      description: 'Inspiring quotes from famous scholars, leaders, and figures of the world',
      fetch: () => {
        fetch('http://api.forismatic.com/api/1.0/', {
          method: 'POST',
          body: JSON.stringify({
            method: 'getQuote',
            format: 'json',
            lang: 'en'
          })
        }).then((res) => {
          const quote = res.json();
          return quote['quoteText'] + ' - ' + quote['quoteAuthor'];
        });
      }
    },
    {
      title: 'Chuck Norris Facts',
      description: 'Get random facts about Chuck Norris and his seemingly infinite skills',
      fetch: () => {
        fetch('https://api.chucknorris.io/jokes/random')
          .then((res) => res.json()['value']);
      }
    },
    {
      title: 'Cat Facts',
      description: 'Receive random cat facts',
      fetch: () => {
        fetch('https://catfact.ninja/fact')
          .then((res) => res.json()['fact']);
      }
    }
  ];

  getRecurring() {
    return this.recurring;
  }

  getExample(recurring: Recurring) {
    return recurring.fetch();
  }
}
