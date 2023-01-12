import { CommandType } from './lib/CommandType';

/**
 * Represents an abstract command in a course. Commands start with a hash (`#`)
 * character. Anything that does not start with a hash symbol will be treated as
 * a note sequence.
 */
export class Command {
  commandType: CommandType;

  constructor(commandType: CommandType) {
    this.commandType = commandType;
  }

  toString(): string {
    return `#${this.commandType}`;
  }
}
