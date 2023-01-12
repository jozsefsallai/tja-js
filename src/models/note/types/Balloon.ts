import { NoteType } from '../lib/NoteType';
import { CountableDrumrollNote } from '../lib/CountableDrumrollNote';

/**
 * Balloon note that needs to reach a certain amount of hits to be popped.
 * Represented by `7`.
 */
export class Balloon extends CountableDrumrollNote {
  constructor() {
    super(NoteType.Balloon);
  }
}
