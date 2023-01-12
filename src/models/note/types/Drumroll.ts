import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

export class Drumroll extends Note {
  constructor() {
    super(NoteType.Drumroll);
  }
}
