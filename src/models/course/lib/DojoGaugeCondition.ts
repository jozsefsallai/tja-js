/**
 * The condition required for clearing a gauge in a dojo course. Defaults to
 * Percentage.
 */
export class DojoGaugeCondition {
  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  static Percentage = new DojoGaugeCondition('g');
  static GoodAmount = new DojoGaugeCondition('jp');
  static OKAmount = new DojoGaugeCondition('jg');
  static BadAmount = new DojoGaugeCondition('jb');
  static Score = new DojoGaugeCondition('s');
  static Drumroll = new DojoGaugeCondition('r');
  static CorrectHits = new DojoGaugeCondition('h');
  static MaxCombo = new DojoGaugeCondition('c');

  private static _values = [
    DojoGaugeCondition.Percentage,
    DojoGaugeCondition.GoodAmount,
    DojoGaugeCondition.OKAmount,
    DojoGaugeCondition.BadAmount,
    DojoGaugeCondition.Score,
    DojoGaugeCondition.Drumroll,
    DojoGaugeCondition.CorrectHits,
    DojoGaugeCondition.MaxCombo,
  ];

  static fromId(
    id: string,
    strict: boolean = true,
  ): DojoGaugeCondition | undefined {
    const item = DojoGaugeCondition._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid DojoGaugeCondition id: ${id}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    return DojoGaugeCondition.fromId(raw, strict);
  }

  toString() {
    return this._id;
  }
}
