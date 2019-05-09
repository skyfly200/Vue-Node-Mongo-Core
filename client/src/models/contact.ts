export class Contact {
  username: string = '';
  avatar: string = '';
  constructor(data: Contact | {} = {}) {
    Object.assign(this, data);
  }
}
