import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class Don extends Note {
  constructor() {
    super(NoteType.Don);
  }
}
