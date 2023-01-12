import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class MultiDon extends Note {
  constructor() {
    super(NoteType.MultiDon);
  }
}
