export class Message {
  convoID: number = new Date().getTime();
  author: string = '';
  body: string = '';
  timestamp: Date = new Date();
  constructor(data: Message | {} = {}) {
    Object.assign(this, data);
  }
}
