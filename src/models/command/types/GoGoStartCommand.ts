import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Marks the start of the Go-Go Time mode for notes. Don will be dancing, bar
 * will be glowing, and marker will be burning during this mode. Score is
 * multiplied by 1.2 for all notes hit during this mode. Can be placed in the
 * middle of a measure.
 */
export class GoGoStartCommand extends Command {
  constructor() {
    super(CommandType.GoGoStart);
  }

  static parse(_args: string[]): GoGoStartCommand | undefined {
    return new GoGoStartCommand();
  }
}
