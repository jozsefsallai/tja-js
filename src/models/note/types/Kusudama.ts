import { NoteType } from '../lib/NoteType';
import { CountableDrumrollNote } from '../lib/CountableDrumrollNote';

export class Kusudama extends CountableDrumrollNote {
  constructor() {
    super(NoteType.Kusudama);
  }
}
