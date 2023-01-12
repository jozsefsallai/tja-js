export class StringBuilder {
  private _strings: string[] = [];
  private _separator: string = '';

  withSeparator(separator: string): StringBuilder {
    this._separator = separator;
    return this;
  }

  append(value: string): StringBuilder {
    this._strings.push(value);
    return this;
  }

  toString(): string {
    return this._strings.join(this._separator);
  }
}
