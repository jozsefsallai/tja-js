import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Multiplies the default scrolling speed by this value. Changes how the notes
 * appear on the screen, values above 1 will make them scroll faster and below 1
 * scroll slower. Negative values will scroll notes from the left instead of the
 * right. Cannot be 0. Can be placed in the middle of a measure.
 *
 * **Example:**
 *
 * ```
 *  #SCROLL 4
 * 30
 * #SCROLL 0.5
 * 11201022112010,
 * ```
 */
export class ScrollCommand extends Command {
  value: number;

  constructor(value: number) {
    super(CommandType.Scroll);
    this.value = value;
  }

  static parse(args: string[]): ScrollCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const value = parseFloat(args[0]);
    if (isNaN(value)) {
      return undefined;
    }

    return new ScrollCommand(value);
  }

  toString(): string {
    return `${super.toString()} ${this.value}`;
  }
}
