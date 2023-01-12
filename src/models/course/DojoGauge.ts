import { DojoGaugeCondition } from './lib/DojoGaugeCondition';
import { DojoGaugeScope } from './lib/DojoGaugeScope';

/**
 * A single gauge that is required towards clearing a dojo course.
 */
export class DojoGauge {
  /**
   * The condition required for filling the gauge.
   */
  condition: DojoGaugeCondition;

  /**
   * The requirement for getting a red clear.
   */
  redClearRequirement: number;

  /**
   * The requirement for getting a gold clear.
   */
  goldClearRequirement: number;

  /**
   * The scope of the comparison.
   */
  scope: DojoGaugeScope;

  constructor(
    condition: DojoGaugeCondition,
    redClearRequirement: number,
    goldClearRequirement: number,
    scope: DojoGaugeScope,
  ) {
    this.condition = condition;
    this.redClearRequirement = redClearRequirement;
    this.goldClearRequirement = goldClearRequirement;
    this.scope = scope;
  }

  static parse(raw: string, strict: boolean = true): DojoGauge | undefined {
    const components = raw.split(',').map((c) => c.trim());
    if (components.length !== 4) {
      if (strict) {
        throw new Error(`Invalid gauge value: ${raw}`);
      }

      return undefined;
    }

    const condition = DojoGaugeCondition.fromRaw(components[0]);
    const redClearRequirement = parseInt(components[1], 10);
    const goldClearRequirement = parseInt(components[2], 10);
    const scope = DojoGaugeScope.fromRaw(components[3]);

    if (
      !condition ||
      isNaN(redClearRequirement) ||
      isNaN(goldClearRequirement) ||
      !scope
    ) {
      if (strict) {
        throw new Error(`Invalid gauge value: ${raw}`);
      }
    }

    return new DojoGauge(
      condition!,
      redClearRequirement,
      goldClearRequirement,
      scope!,
    );
  }

  toString() {
    return `${this.condition},${this.redClearRequirement},${this.goldClearRequirement},${this.scope}`;
  }
}
