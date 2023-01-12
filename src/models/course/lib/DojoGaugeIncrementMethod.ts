/**
 * Gauge increment method, performing rounding with each note that is hit.
 */
export class DojoGaugeIncrementMethod {
  private _name: string;

  private constructor(id: string) {
    this._name = id;
  }

  /**
   * Default calculation method, which delays the gauge from appearing at the
   * beginning.
   */
  static Normal = new DojoGaugeIncrementMethod('Normal');

  /**
   * Round towards negative infinity.
   */
  static Floor = new DojoGaugeIncrementMethod('Floor');

  /**
   * Round towards nearest whole.
   */
  static Round = new DojoGaugeIncrementMethod('Round');

  /**
   * Do not perform rounding.
   */
  static Notfix = new DojoGaugeIncrementMethod('Notfix');

  /**
   * Round towards positive infinity, the gauge appears to fill with the first
   * note.
   */
  static Ceiling = new DojoGaugeIncrementMethod('Ceiling');

  private static _values = [
    DojoGaugeIncrementMethod.Normal,
    DojoGaugeIncrementMethod.Floor,
    DojoGaugeIncrementMethod.Round,
    DojoGaugeIncrementMethod.Notfix,
    DojoGaugeIncrementMethod.Ceiling,
  ];

  static fromName(
    name: string,
    strict: boolean = true,
  ): DojoGaugeIncrementMethod | undefined {
    const item = DojoGaugeIncrementMethod._values.find(
      (it) => it._name === name,
    );
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid gauge increment method: ${name}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    return DojoGaugeIncrementMethod.fromName(raw, strict);
  }

  toString() {
    return this._name;
  }
}
