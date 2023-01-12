import { NoteType } from './lib/NoteType';

export class Note {
  noteType: NoteType;

  constructor(noteType: NoteType) {
    this.noteType = noteType;
  }

  get isBlank() {
    return this.noteType === NoteType.Blank;
  }

  get isDon() {
    return this.noteType === NoteType.Don;
  }

  get isKa() {
    return this.noteType === NoteType.Ka;
  }

  get isBigDon() {
    return this.noteType === NoteType.DON;
  }

  get isBigKa() {
    return this.noteType === NoteType.KA;
  }

  get isDrumroll() {
    return this.noteType === NoteType.Drumroll;
  }

  get isBigDrumroll() {
    return this.noteType === NoteType.DRUMROLL;
  }

  get isBalloon() {
    return this.noteType === NoteType.Balloon;
  }

  get isEndOfDrumroll() {
    return this.noteType === NoteType.DrumrollEnd;
  }

  get isKusudama() {
    return this.noteType === NoteType.Kusudama;
  }

  get isMultiDon() {
    return this.noteType === NoteType.MultiDon;
  }

  get isMultiKa() {
    return this.noteType === NoteType.MultiKa;
  }

  get isADLIB() {
    return this.noteType === NoteType.ADLIB;
  }

  get isMeasureEnd() {
    return this.noteType === NoteType.MeasureEnd;
  }

  toString(): string {
    return this.noteType.toString();
  }
}
