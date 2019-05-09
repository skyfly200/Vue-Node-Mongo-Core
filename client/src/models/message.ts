export class Message {
  username: String = '';
  avatar: String = '';
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
