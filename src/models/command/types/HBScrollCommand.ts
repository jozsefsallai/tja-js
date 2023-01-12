import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

export class HBScrollCommand extends Command {
  constructor() {
    super(CommandType.HBScroll);
  }

  static parse(_args: string[]): HBScrollCommand | undefined {
    return new HBScrollCommand();
  }
}
