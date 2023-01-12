import { Command } from '../Command';
import { BranchType } from '../lib/BranchType';
import { CommandType } from '../lib/CommandType';

/**
 * Marks the beginning of a branch in a chart with diverge notes.
 *
 * **Example:**
 *
 * ```
 * 5800,
 * 0,
 * #BRANCHSTART r,1,2
 * #N
 * 1111,
 * #E
 * 22202220,
 * #M
 * 12121212,
 * ```
 */
export class BranchMarkerCommand extends Command {
  branchType: BranchType;

  constructor(branchType: BranchType) {
    super(CommandType.BranchMarker);
    this.branchType = branchType;
  }

  static parse(branchType: BranchType): BranchMarkerCommand | undefined {
    switch (branchType) {
      case BranchType.Normal:
        return new NormalBranchMarkerCommand();
      case BranchType.Advanced:
        return new AdvancedBranchMarkerCommand();
      case BranchType.Master:
        return new MasterBranchMarkerCommand();
    }
  }

  toString() {
    return `#${this.branchType.toString()}`;
  }
}

/**
 * Marks the beginning of the Normal branch.
 */
export class NormalBranchMarkerCommand extends BranchMarkerCommand {
  constructor() {
    super(BranchType.Normal);
  }
}

/**
 * Marks the beginning of the Advanced or Professional branch.
 */
export class AdvancedBranchMarkerCommand extends BranchMarkerCommand {
  constructor() {
    super(BranchType.Advanced);
  }
}

/**
 * Marks the beginning of the Master branch.
 */
export class MasterBranchMarkerCommand extends BranchMarkerCommand {
  constructor() {
    super(BranchType.Master);
  }
}
