export class Contact {
  username: string = '';
  avatar: string = '';
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
