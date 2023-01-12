export class Game {
  private _name: string;

  private constructor(name: string) {
    this._name = name;
  }

  static Taiko = new Game('Taiko');
  static Jube = new Game('Jube');

  private static _values = [Game.Taiko, Game.Jube];

  static fromName(name: string, strict: boolean = true): Game | undefined {
    const item = Game._values.find((it) => it._name === name);
    if (item) {
      return item;
    }

    if (strict) {
      throw new Error(`Invalid game: ${name}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    return Game.fromName(raw, strict);
  }

  toString() {
    return this._name;
  }
}
