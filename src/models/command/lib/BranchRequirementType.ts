/**
 * The requirement needed to trigger a branch in a chart with diverge notes.
 */
export class BranchRequirementType {
  private _id: string;

  private constructor(id: string) {
    this._id = id;
  }

  /*
    The amount of drumroll and balloon hits determines the path. In TJA, this
    type is represented by the letter `r`.
  */
  static Drumroll = new BranchRequirementType('r');

  /*
    Accuracy determines the path. Note accuracy between #SECTION and one
    measure before #BRANCHSTART are summed together, divided by their amount,
    and multiplied by 100 (exception: zero amount of notes will equal zero
    accuracy). GOOD notes have 1 accuracy, OK notes have 0.5 accuracy, and BAD
    notes have 0 accuracy. In TJA, this type is represented by the letter `p`,
    but any other value will trigger this type.
  */
  static Accuracy = new BranchRequirementType('p');

  private static _values = [
    BranchRequirementType.Drumroll,
    BranchRequirementType.Accuracy,
  ];

  static fromId(
    id: string,
    strict: boolean = true,
  ): BranchRequirementType | undefined {
    if (id === 'r') {
      return BranchRequirementType.Drumroll;
    }

    return BranchRequirementType.Accuracy;
  }

  static fromRaw(raw: string, strict: boolean = true) {
    return BranchRequirementType.fromId(raw, strict);
  }

  toString() {
    return this._id;
  }
}
