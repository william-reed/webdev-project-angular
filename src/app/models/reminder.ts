export class Reminder {
  _id: string;
  userId: string;
  username: string;
  content: string;
  timeToSend: Date;
  timeToSendString: string;
  sent: boolean;
}
