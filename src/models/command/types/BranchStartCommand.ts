import { Command } from '../Command';
import { BranchRequirementType } from '../lib/BranchRequirementType';
import { CommandType } from '../lib/CommandType';

/**
 * Having this command in a song notation will mark the song's difficulty on
 * song selection as having diverge notes and the song will appear to start on
 * the Normal branch.
 *
 * **Example:**
 *
 * ```
 * #BRANCHSTART p,75,85
 * ```
 */
export class BranchStartCommand extends Command {
  /**
   * The requirement type for triggering a specific branch.
   */
  requirementType: BranchRequirementType;

  /**
   * The requirement value for triggering the Advanced/Professional branch.
   */
  advancedRequirement: number;

  /**
   * The requirement value for triggering the Master branch.
   */
  masterRequirement: number;

  constructor(
    requirementType: BranchRequirementType,
    advancedRequirement: number,
    masterRequirement: number,
  ) {
    super(CommandType.BranchStart);

    this.requirementType = requirementType;
    this.advancedRequirement = advancedRequirement;
    this.masterRequirement = masterRequirement;
  }

  static parse(
    args: string[],
    strict: boolean,
  ): BranchStartCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const components = args[0].split(',');

    if (components.length !== 3) {
      return undefined;
    }

    const requirementType = BranchRequirementType.fromRaw(
      components[0],
      strict,
    );
    if (!requirementType) {
      return undefined;
    }

    const advancedRequirement = parseInt(components[1], 10);
    if (isNaN(advancedRequirement)) {
      return undefined;
    }

    const masterRequirement = parseInt(components[2], 10);
    if (isNaN(masterRequirement)) {
      return undefined;
    }

    return new BranchStartCommand(
      requirementType,
      advancedRequirement,
      masterRequirement,
    );
  }

  toString(): string {
    return `${super.toString()} ${this.requirementType},${
      this.advancedRequirement
    },${this.masterRequirement}`;
  }
}
