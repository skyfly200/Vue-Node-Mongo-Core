export class Message {
  author: string = '';
  body: string = '';
  timestamp: Date = new Date();
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
