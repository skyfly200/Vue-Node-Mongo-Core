import {Contact} from '@/models/contact';
import {Message} from '@/models/message';

export class Conversation {
  id: number = new Date().getTime();
  unread: boolean = false;
  active: boolean = true;
  title: string = '';
  styles: object = {
    color: "default",
    density: "medium"
  };
  notifications: object = {
    enabled: true,
    muteExpire: new Date()
  };
  created: Date = new Date(2018,11,28);
  creator: string = "";
  members: Array<Contact> = [new Contact()];
  messages: Array<Message> = [new Message()];
  constructor(data: Conversation | {} = {}) {
    Object.assign(this, data);
  }
}
