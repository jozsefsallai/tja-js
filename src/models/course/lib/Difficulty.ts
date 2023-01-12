/**
 * The difficulty of a course.
 */
export class Difficulty {
  private _id: number;
  private _name: string;

  private constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  static Easy = new Difficulty(0, 'Easy');
  static Normal = new Difficulty(1, 'Normal');
  static Hard = new Difficulty(2, 'Hard');
  static Oni = new Difficulty(3, 'Oni');
  static Edit = new Difficulty(4, 'Edit');
  static Ura = new Difficulty(4, 'Ura'); // alias
  static InnerOni = new Difficulty(4, 'InnerOni'); // alias
  static Tower = new Difficulty(5, 'Tower');
  static Dan = new Difficulty(6, 'Dan');

  private static _values = [
    Difficulty.Easy,
    Difficulty.Normal,
    Difficulty.Hard,
    Difficulty.Oni,
    Difficulty.Edit,
    Difficulty.Ura,
    Difficulty.InnerOni,
    Difficulty.Tower,
    Difficulty.Dan,
  ];

  static fromId(id: number, strict: boolean = true): Difficulty | undefined {
    const difficulty = Difficulty._values.find((d) => d._id === id);
    if (difficulty) {
      return difficulty;
    }

    if (strict) {
      throw new Error(`Invalid difficulty id: ${id}`);
    }
  }

  static fromName(
    name: string,
    strict: boolean = true,
  ): Difficulty | undefined {
    const difficulty = Difficulty._values.find(
      (d) => d._name.toLowerCase() === name.toLowerCase(),
    );
    if (difficulty) {
      return difficulty;
    }

    if (strict) {
      throw new Error(`Invalid difficulty name: ${name}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return isNaN(parsedValue)
      ? Difficulty.fromName(raw, strict)
      : Difficulty.fromId(parsedValue, strict);
  }

  toString() {
    return this._name;
  }
}
