import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Marks the end of the Go-Go Time mode for notes. Don will be dancing, bar will
 * be glowing, and marker will be burning during this mode. Score is multiplied
 * by 1.2 for all notes hit during this mode. Can be placed in the middle of a
 * measure.
 */
export class GoGoEndCommand extends Command {
  constructor() {
    super(CommandType.GoGoEnd);
  }

  static parse(_args: string[]): GoGoEndCommand | undefined {
    return new GoGoEndCommand();
  }
}
