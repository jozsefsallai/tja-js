import { JPosScrollDirection } from '../../common/JPosScrollDirection';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Linearly transition cursor's position to a different position on a bar. Can
 * be placed in the middle of a measure.
 *
 * **Example:**
 *
 * ```
 * #BPMCHANGE 120
 * #JPOSSCROLL 2 760 1
 * #SCROLL 0.8
 * 1111,
 * #JPOSSCROLL 2 760 0
 * #SCROLL -0.8
 * 2222,
 * ```
 */
export class JPosScrollCommand extends Command {
  /**
   * The amount of seconds it takes for cursor to transition. If it takes too
   * long before another #JPOSSCROLL is passed, it will be cancelled and next
   * transition will happen at the cursor's current position.
   */
  time: number;

  /**
   * The relative distance in pixels to move the cursor.
   */
  distance: number;

  /**
   * The direction of the scroll.
   */
  direction: JPosScrollDirection;

  constructor(time: number, distance: number, direction: JPosScrollDirection) {
    super(CommandType.JPosScroll);

    this.time = time;
    this.distance = distance;
    this.direction = direction;
  }

  static parse(args: string[]): JPosScrollCommand | undefined {
    if (args.length !== 3) {
      return undefined;
    }

    const time = parseFloat(args[0]);
    if (isNaN(time)) {
      return undefined;
    }

    const distance = parseFloat(args[1]);
    if (isNaN(distance)) {
      return undefined;
    }

    const direction = JPosScrollDirection.fromRaw(args[2]);
    if (!direction) {
      return undefined;
    }

    return new JPosScrollCommand(time, distance, direction);
  }

  toString(): string {
    return `${super.toString()} ${this.time} ${this.distance} ${
      this.direction
    }`;
  }
}
