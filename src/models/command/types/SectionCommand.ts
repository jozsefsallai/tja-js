import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Reset accuracy values for notes and drumrolls on the next measure. Placing it
 * near `#BRANCHSTART` or a measure before does not reset the accuracy for that
 * branch. The value is calculated before it and a measure has not started yet
 * at that point.
 *
 * **Example:**
 *
 * ```
 * 11111111,
 * ,
 * #SECTION
 * #BRANCHSTART p,50,75
 * #BRANCHEND
 * 11111111,
 * ,
 * #BRANCHSTART p,50,75
 * #BRANCHEND
 * 11111111,
 * ```
 */
export class SectionCommand extends Command {
  constructor() {
    super(CommandType.Section);
  }

  static parse(_args: string[]): SectionCommand | undefined {
    return new SectionCommand();
  }
}
