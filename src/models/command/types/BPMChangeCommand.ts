import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Changes song's BPM. Can be placed in the middle of a measure, therefore it is
 * necessary to calculate milliseconds per measure value for each note.
 *
 * **Example:**
 *
 * ```
 * #BPMCHANGE 115
 * 2344
 * #BPMCHANGE 125
 * 3443,
 * ```
 */
export class BPMChangeCommand extends Command {
  value: number;

  constructor(value: number) {
    super(CommandType.BPMChange);
    this.value = value;
  }

  static parse(args: string[]): BPMChangeCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const value = parseInt(args[0], 10);
    if (isNaN(value)) {
      return undefined;
    }

    return new BPMChangeCommand(value);
  }

  toString(): string {
    return `${super.toString()} ${this.value}`;
  }
}
