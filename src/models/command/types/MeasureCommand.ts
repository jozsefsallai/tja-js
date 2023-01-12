import { MeasureValue } from '../../course/lib/MeasureValue';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Changes time signature used. Numerator and denominator from the value are
 * divided by one another. Formula to get the amount of milliseconds per
 * measure: `60000 * MEASURE * 4 / BPM`. After inserting a note, the current
 * timing point is increased by milliseconds per measure divided by amount of
 * notes in the current measure. Command can only be placed between measures.
 *
 * Example:
 *
 * ```
 * #MEASURE 4/4
 * 1000100011101010,
 * #MEASURE 2/4
 * 0212,
 * ```
 */
export class MeasureCommand extends Command {
  value: MeasureValue;

  constructor(value: MeasureValue) {
    super(CommandType.Measure);
    this.value = value;
  }

  static parse(args: string[]): MeasureCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const value = args[0]
      .split('/')
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v));
    if (value.length !== 2) {
      return undefined;
    }

    const measureValue = new MeasureValue(value[0], value[1]);
    return new MeasureCommand(measureValue);
  }

  toString(): string {
    return `${super.toString()} ${this.value.toString()}`;
  }
}
