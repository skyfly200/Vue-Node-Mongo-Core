export class User {
  _id: String = '';
  username: String = '';
  active: Boolean = false;
  roles: Array<String> = [""];
  constructor(data = {}) {
    Object.assign(this, data);
  }
}
