export class Contact {
  username: String = '';
  avatar: String = '';
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
