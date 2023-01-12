import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class BigDrumroll extends Note {
  constructor() {
    super(NoteType.DRUMROLL);
  }
}
