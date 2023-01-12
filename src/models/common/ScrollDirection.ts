/**
 * The scroll direction of the notes in a sequence.
 */
export class ScrollDirection {
  private _id: number;

  private constructor(id: number) {
    this._id = id;
  }

  static FromRight = new ScrollDirection(0);
  static FromAbove = new ScrollDirection(1);
  static FromBelow = new ScrollDirection(2);
  static FromTopRight = new ScrollDirection(3);
  static FromBottomRight = new ScrollDirection(4);
  static FromLeft = new ScrollDirection(5);
  static FromTopLeft = new ScrollDirection(6);
  static FromBottomLeft = new ScrollDirection(7);

  private static _values = [
    ScrollDirection.FromRight,
    ScrollDirection.FromAbove,
    ScrollDirection.FromBelow,
    ScrollDirection.FromTopRight,
    ScrollDirection.FromBottomRight,
    ScrollDirection.FromLeft,
    ScrollDirection.FromTopLeft,
    ScrollDirection.FromBottomLeft,
  ];

  static fromId(
    id: number,
    strict: boolean = true,
  ): ScrollDirection | undefined {
    const item = ScrollDirection._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid ScrollDirection id: ${id}`);
    }
  }

  toString() {
    return this._id;
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return ScrollDirection.fromId(parsedValue, strict);
  }
}
