export class DojoGaugeScope {
  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  /**
   * Greater than <requirement>.
   */
  static GreaterThan = new DojoGaugeScope('m');

  /**
   * Less than <requirement>.
   */
  static LessThan = new DojoGaugeScope('l');

  private static _values = [
    DojoGaugeScope.GreaterThan,
    DojoGaugeScope.LessThan,
  ];

  static fromId(
    id: string,
    strict: boolean = true,
  ): DojoGaugeScope | undefined {
    const item = DojoGaugeScope._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid gauge scope id: ${id}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    return DojoGaugeScope.fromId(raw, strict);
  }

  toString() {
    return this._id;
  }
}
