import {Injectable} from '@angular/core';
import {Reminder} from '../models/reminder';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  reminders: Reminder[] = [
    {
      content: 'Get the mail',
      timeToSend: new Date('27 July 2016 13:30:00')
    },
    {
      content: 'Take out the trash',
      timeToSend: new Date('26 July 2016 13:30:00')
    },
    {
      content: 'Do your homework',
      timeToSend: new Date('26 July 2016 10:30:00')
    },
    {
      content: 'Ask Jenny about this weekend\'s trip',
      timeToSend: new Date('25 July 2016 18:30:00')
    },
    {
      content: 'Go buy bread from the grocery store',
      timeToSend: new Date('25 July 2016 14:30:00')
    },
    {
      content: 'Ask Josh about going for a run tomorrow',
      timeToSend: new Date('25 July 2016 09:30:00')
    },
    {
      content: 'Watch Westworld tonight with roomates',
      timeToSend: new Date('24 July 2016 20:30:00')
    },
    {
      content: 'Do your Web Dev homework',
      timeToSend: new Date('23 July 2016 18:15:00')
    },
    {
      content: 'Go to the gym',
      timeToSend: new Date('23 July 2016 13:30:00')
    },
    {
      content: 'Visit the doctor',
      timeToSend: new Date('23 July 2016 09:24:00')
    },
    {
      content: 'Call mom',
      timeToSend: new Date('22 July 2016 13:30:00')
    },
  ];

  constructor() {
  }

  // utilizing promises to ease the eventual transition to async web events
  // mocking for now
  getReminders() {
    return Promise.resolve(this.reminders);
  }

  addReminder(user: User, reminder: Reminder) {
    // TODO:
    console.log('adding fake reminder for ' + reminder.content);
    return Promise.resolve(true);
  }

  getRemindersForUser(user: User) {
    return Promise.resolve(this.reminders);
  }
}
