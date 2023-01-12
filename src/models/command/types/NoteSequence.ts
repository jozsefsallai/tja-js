import { Note } from '../../note/Note';
import { NoteFactory } from '../../note/NoteFactory';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Defines a sequence of notes, optionally ended with a measure character.
 *
 * ### Notes
 *
 * - `0` - Blank, no note.
 * - `1` - Don.
 * - `2` - Ka.
 * - `3` - DON (big).
 * - `4` - KA (big).
 * - `5` - Drumroll. Must end with `8`.
 * - `6` - DRUMROLL (big). Must end with `8`.
 * - `7` - Balloon. Must end with `8`.
 * - `8` - End of drumroll or balloon.
 * - `9` - Kusudama, yam, oimo, or big balloon. Should end with an `8`. Use
 * another `9` to specify when to lower the points for clearing.
 * - `A` - DON (Both). Multiplayer note with hands.
 * - `B` - KA (Both). Multiplayer note with hands.
 * - `F` - ADLIB. Hidden note that will increase combo if discovered and does
 * not give a BAD when missed.
 *
 * **Example:**
 *
 * ```
 * 1020112010201120,
 * 34040122,
 * 1101103070000080,
 * 50080060,
 * 08009009,
 * ```
 *
 * ### Measures
 *
 * Measures in the chart are separated with a comma character `,` followed by a
 * line break. Timing between each measure is the same as long as `#MEASURE` and
 * `#BPMCHANGE` commands are not used. Measures may contain any amount of notes,
 * including zero, the less numbers there are in a measure, the more far apart
 * the notes will be in the chart, each measure is equally divided by the amount
 * of numbers there are inside. `12,` can be written as `1020,` and `10002000,`,
 * the timing is identical in all three examples.
 */
export class NoteSequence extends Command {
  notes: Note[];

  constructor() {
    super(CommandType.NoteSequence);
    this.notes = [];
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  static parse(
    args: string[],
    strict: boolean = true,
  ): NoteSequence | undefined {
    const command = new NoteSequence();

    const rawNotes = args.join('').split('');

    rawNotes.forEach((rawNote) => {
      const note = NoteFactory.fromCourseValue(rawNote, strict);

      if (note) {
        command.addNote(note);
      }
    });

    return command;
  }

  toString(): string {
    return this.notes.join('');
  }
}
