export class PropUpdate {
  id: number = new Date().getTime();
  property: string = "";
  value: (string | boolean | object) = "";
  constructor(data: PropUpdate | {} = {}) {
    Object.assign(this, data);
  }
}
