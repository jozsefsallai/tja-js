import { Note } from '../Note';

/**
 * A special `Note` type which also contains a counter for how many times the
 * note needs to be hit in order to clear it. This is used for balloon and
 * kusudama notes.
 */
export class CountableDrumrollNote extends Note {
  private _count: number = 0;

  get count() {
    return this._count;
  }

  set count(count: number) {
    this._count = count;
  }
}
