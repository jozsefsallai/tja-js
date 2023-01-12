import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Marks the end of the course.
 */
export class EndCommand extends Command {
  constructor() {
    super(CommandType.End);
  }

  static parse(_args: string[]): EndCommand | undefined {
    return new EndCommand();
  }
}
