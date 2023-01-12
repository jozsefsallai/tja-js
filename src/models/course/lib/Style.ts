/**
 * Play the song notation after next #START depending on if playing in
 * singleplayer or multiplayer.
 */
export class Style {
  private _id: number;
  private _name: string;

  private constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  static Single = new Style(1, 'Single');
  static Double = new Style(2, 'Double');
  static Couple = new Style(2, 'Couple');

  private static _values = [Style.Single, Style.Double, Style.Couple];

  static fromId(id: number, strict: boolean = true): Style | undefined {
    const style = Style._values.find((s) => s._id === id);
    if (style) {
      return style;
    }

    if (strict) {
      throw new Error(`Invalid style id: ${id}`);
    }
  }

  static fromName(name: string, strict: boolean = true): Style | undefined {
    const style = Style._values.find((s) => s._name === name);
    if (style) {
      return style;
    }

    if (strict) {
      throw new Error(`Invalid style name: ${name}`);
    }
  }

  static fromRaw(raw: string, strict: boolean = true) {
    const parsedValue = parseInt(raw, 10);
    return isNaN(parsedValue)
      ? Style.fromName(raw, strict)
      : Style.fromId(parsedValue, strict);
  }

  toString() {
    return this._name;
  }
}
