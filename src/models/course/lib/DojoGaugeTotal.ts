/**
 * Wrapper class around JavaScript's Number. Percentage multiplier for amount of
 * notes in the song notation that is applied to gauge calculation.
 */
export class DojoGaugeTotal extends Number {
  /**
   * If this is true, it is impossible to get a full gauge.
   */
  get isImpossible() {
    return (this as Number) < 100;
  }

  /**
   * If this is true, all notes are required to be hit perfectly.
   */
  get areAllNotesRequired() {
    return (this as Number) === 100;
  }

  /**
   * If this is true, it is easier to fill the gauge.
   */
  get isEasier() {
    return (this as Number) > 100;
  }
}
