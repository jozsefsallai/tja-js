import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Delays notes from appearing, starting their movement in the middle of the
 * screen instead of off-screen. Can be placed in the middle of a measure.
 *
 * **Example:**
 *
 * ```
 * #SUDDEN 2 1
 * 1122,
 * ```
 */
export class SuddenCommand extends Command {
  /**
   * Appearance time, marking the note appearance this many seconds in advance.
   */
  appearanceTime: number;

  /**
   * Movement wait time, notes stay in place and start moving when this many
   * seconds are left.
   */
  movementWaitTime: number;

  constructor(appearanceTime: number, movementWaitTime: number) {
    super(CommandType.Sudden);

    this.appearanceTime = appearanceTime;
    this.movementWaitTime = movementWaitTime;
  }

  static parse(args: string[]): SuddenCommand | undefined {
    if (args.length !== 2) {
      return undefined;
    }

    const appearanceTime = parseFloat(args[0]);
    if (isNaN(appearanceTime)) {
      return undefined;
    }

    const movementWaitTime = parseFloat(args[1]);
    if (isNaN(movementWaitTime)) {
      return undefined;
    }

    return new SuddenCommand(appearanceTime, movementWaitTime);
  }

  toString(): string {
    return `${super.toString()} ${this.appearanceTime} ${
      this.movementWaitTime
    }`;
  }
}
