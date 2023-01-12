import { Note } from './Note';

import { NoteType } from './lib/NoteType';

import {
  Balloon,
  BigDon,
  BigDrumroll,
  BigKa,
  BlankNote,
  Don,
  Drumroll,
  DrumrollEnd,
  Ka,
  Kusudama,
  MultiDon,
  MultiKa,
  MeasureEnd,
} from './types';

export class NoteFactory {
  static fromCourseValue(
    raw: string,
    strict: boolean = true,
  ): Note | undefined {
    switch (raw) {
      case NoteType.Blank:
        return new BlankNote();
      case NoteType.Don:
        return new Don();
      case NoteType.Ka:
        return new Ka();
      case NoteType.DON:
        return new BigDon();
      case NoteType.KA:
        return new BigKa();
      case NoteType.Drumroll:
        return new Drumroll();
      case NoteType.DRUMROLL:
        return new BigDrumroll();
      case NoteType.Balloon:
        return new Balloon();
      case NoteType.DrumrollEnd:
        return new DrumrollEnd();
      case NoteType.Kusudama:
        return new Kusudama();
      case NoteType.MultiDon:
        return new MultiDon();
      case NoteType.MultiKa:
        return new MultiKa();
      case NoteType.ADLIB:
        return new MultiKa();
      case NoteType.MeasureEnd:
        return new MeasureEnd();
    }

    if (strict) {
      throw new TypeError(`Unsupported note type: ${raw}`);
    }
  }
}
