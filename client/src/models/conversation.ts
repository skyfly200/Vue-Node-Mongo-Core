import {Contact} from '@/models/contact';
import {Message} from '@/models/message';

export class Conversation {
  id: Number = new Date().getTime();
  unread: Boolean = false;
  title: String = '';
  styles: Object = {
    color: "default",
    density: "medium"
  };
  notifications: Object = {
    enabled: true,
    muteExpire: new Date()
  };
  created: Date = new Date(2018,11,28);
  creator: String = "";
  members: Array<Contact> = [new Contact()];
  messages: Array<Message> = [new Message()];
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
