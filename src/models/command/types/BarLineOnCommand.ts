import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Turns on the visual appearance of measure lines.
 */
export class BarLineOnCommand extends Command {
  constructor() {
    super(CommandType.BarLineOn);
  }

  static parse(_args: string[]): BarLineOnCommand | undefined {
    return new BarLineOnCommand();
  }
}
