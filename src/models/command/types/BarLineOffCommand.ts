import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Turns off the visual appearance of measure lines until the next #BARLINEON
 * command.
 */
export class BarLineOffCommand extends Command {
  constructor() {
    super(CommandType.BarLineOff);
  }

  static parse(_args: string[]): BarLineOffCommand | undefined {
    return new BarLineOffCommand();
  }
}
