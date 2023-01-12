export class Side {
  private _id: number;

  private constructor(id: number) {
    this._id = id;
  }

  static Normal = new Side(1);
  static Ex = new Side(2);
  static Both = new Side(3);

  private static _values = [Side.Normal, Side.Ex, Side.Both];

  static fromId(id: number, strict: boolean = true): Side | undefined {
    const item = Side._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid side id: ${id}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return Side.fromId(parsedValue, strict);
  }

  toString() {
    return this._id;
  }
}
