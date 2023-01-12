import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

export class BMScrollCommand extends Command {
  constructor() {
    super(CommandType.BMScroll);
  }

  static parse(_args: string[]): BMScrollCommand | undefined {
    return new BMScrollCommand();
  }
}
