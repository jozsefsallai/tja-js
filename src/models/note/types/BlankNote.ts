import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class BlankNote extends Note {
  constructor() {
    super(NoteType.Blank);
  }
}
