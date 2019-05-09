export class Message {
  author: String = '';
  body: String = '';
  timestamp: Date = new Date();
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
