import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Begins a normal song notation without branching. Retains the visual branch
 * from previous #BRANCHSTART.
 */
export class BranchEndCommand extends Command {
  constructor() {
    super(CommandType.BranchEnd);
  }

  static parse(_args: string[]): BranchEndCommand | undefined {
    return new BranchEndCommand();
  }
}
