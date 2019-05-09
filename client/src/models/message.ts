export class Message {
  author: string = '';
  body: string = '';
  timestamp: Date = new Date();
  constructor(data: Message | {} = {}) {
    Object.assign(this, data);
  }
}
