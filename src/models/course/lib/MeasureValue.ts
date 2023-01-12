/**
 * Represents a measure.
 */
export class MeasureValue {
  /**
   * The numerator of the measure's time signature.
   */
  numerator: number;

  /**
   * The denominator of the measure's time signature.
   */
  denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * Get the measure value as a floating point number.
   */
  get fraction() {
    return this.numerator / this.denominator;
  }
}
