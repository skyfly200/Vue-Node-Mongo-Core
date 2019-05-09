export class Conversation {
  id: Number = new Date().getTime();
  unread: Boolean = false;
  title: String = '';
  styles: Object = {
    color: "default",
    density: "medium"
  };
  notifications: Object = {
    enabled: Boolean = true,
    muteExpire: Date = new Date()
  };
  created: new Date(2018,11,28);
  creator: String = "";
  members: Array<Contact> = [];
  messages: Array<Message> = [];
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
