import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class BigDon extends Note {
  constructor() {
    super(NoteType.DON);
  }
}
