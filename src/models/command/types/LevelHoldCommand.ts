import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * The branch that is currently being played is forced until the end of the song.
 */
export class LevelHoldCommand extends Command {
  constructor() {
    super(CommandType.LevelHold);
  }

  static parse(_args: string[]): LevelHoldCommand | undefined {
    return new LevelHoldCommand();
  }
}
