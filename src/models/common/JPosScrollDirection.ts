/**
 * The direction of the linear scoll.
 */
export class JPosScrollDirection {
  private _id: number;

  private constructor(id: number) {
    this._id = id;
  }

  // Scroll from left. Represented by `0`.
  static Left = new JPosScrollDirection(0);

  // Scroll from right. Represented by `1`.
  static Right = new JPosScrollDirection(1);

  private static _values = [
    JPosScrollDirection.Left,
    JPosScrollDirection.Right,
  ];

  static fromId(
    id: number,
    strict: boolean = true,
  ): JPosScrollDirection | undefined {
    const item = JPosScrollDirection._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid JPosScrollDirection id: ${id}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return JPosScrollDirection.fromId(parsedValue, strict);
  }

  toString() {
    return this._id;
  }
}
