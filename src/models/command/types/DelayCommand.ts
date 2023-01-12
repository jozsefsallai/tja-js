import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Floating point value in seconds that offsets the position of the following
 * song notation. If value is negative, following song notation will overlap
 * with the previous. All notes should be placed in such way that notes after
 * #DELAY do not appear earlier or at the same time as the notes before. Can be
 * placed in the middle of a measure.
 *
 * **Example:**
 *
 * ```
 * #DELAY 0.02
 * ```
 */
export class DelayCommand extends Command {
  value: number;

  constructor(value: number) {
    super(CommandType.Delay);
    this.value = value;
  }

  static parse(args: string[]): DelayCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const value = parseFloat(args[0]);
    if (isNaN(value)) {
      return undefined;
    }

    return new DelayCommand(value);
  }

  toString(): string {
    return `${super.toString()} ${this.value}`;
  }
}
