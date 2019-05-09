export class User {
  _id: string = '';
  username: string = '';
  active: Boolean = false;
  roles: Array<string> = [""];
  constructor(data: User | {} = {}) {
    Object.assign(this, data);
  }
}
