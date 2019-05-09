export class Contact {
  author: String = '';
  body: String = '';
  timestamp: Date = new Date();
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
