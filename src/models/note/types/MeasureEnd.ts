import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

/**
 * Represents the end of a measure. Must always be the very last item in a note
 * sequence. Represented by comma (`,`).
 */
export class MeasureEnd extends Note {
  constructor() {
    super(NoteType.MeasureEnd);
  }
}
