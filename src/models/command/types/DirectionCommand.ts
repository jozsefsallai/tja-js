import { ScrollDirection } from '../../common/ScrollDirection';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Scrolling direction for the notes following this command. Can be placed in
 * the middle of a measure.
 *
 * **Example:**
 *
 * ```
 * #DIRECTION 2
 * ```
 */
export class DirectionCommand extends Command {
  direction: ScrollDirection;

  constructor(direction: ScrollDirection) {
    super(CommandType.Direction);
    this.direction = direction;
  }

  static parse(args: string[], strict: boolean): DirectionCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const direction = ScrollDirection.fromRaw(args[0], strict);
    if (!direction) {
      return undefined;
    }

    return new DirectionCommand(direction);
  }

  toString(): string {
    return `${super.toString()} ${this.direction}`;
  }
}
