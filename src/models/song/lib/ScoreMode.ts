/**
 * Scoring method that affects the final score. All scores are divided by 10,
 * rounded towards negative infinity, then multiplied by 10.
 */
export class ScoreMode {
  private _id: number;

  private constructor(id: number) {
    this._id = id;
  }

  /**
   * AC 1 to AC 7 generation scoring. Default.
   *
   * - Less than 200 combo: `INIT` or 1000 pts per note.
   * - 200 combo or more: `INIT + DIFF` or 2000 pts (1000+1000) per note.
   */
  static AC_1_TO_AC_7 = new ScoreMode(0);

  /**
   * AC 8 to AC 14 generation scoring.
   *
   * - Combo multiplier rises by `DIFF` with each 10 combo until 100, after
   * which it increases at a constant rate.
   * - Formula: `INIT + max(0, DIFF * floor((min(COMBO, 100) - 1) / 10))`
   */
  static AC_8_TO_AC_14 = new ScoreMode(1);

  /**
   * Similar to "1" with some DIFF multipliers missing.
   * Formula: `INIT + DIFF * {100<=COMBO: 8, 50<=COMBO: 4, 30<=COMBO: 2, 10<=COMBO: 1, 0}`.
   */
  static AC_0 = new ScoreMode(2);

  private static _values = [
    ScoreMode.AC_1_TO_AC_7,
    ScoreMode.AC_8_TO_AC_14,
    ScoreMode.AC_0,
  ];

  static fromId(id: number, strict: boolean = true): ScoreMode | undefined {
    const item = ScoreMode._values.find((it) => it._id === id);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid score mode id: ${id}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return ScoreMode.fromId(parsedValue, strict);
  }

  toString() {
    return this._id;
  }
}
