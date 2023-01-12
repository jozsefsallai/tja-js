import { Note } from '../Note';
import { NoteType } from '../lib/NoteType';

/**
 * Hidden note that will increase combo if discovered and does not give a BAD
 * when missed. Represented as `F`.
 */
export class ADLIB extends Note {
  constructor() {
    super(NoteType.ADLIB);
  }
}
