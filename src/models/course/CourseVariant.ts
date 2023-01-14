import { StringBuilder } from '../../utils/StringBuilder';
import { Command } from '../command/Command';
import { BranchType } from '../command/lib/BranchType';
import { CommandType } from '../command/lib/CommandType';
import { BranchMarkerCommand, NoteSequence } from '../command/types';
import { CourseMetadataProperty } from '../common/MetadataProperty';
import { Player } from '../common/Player';
import { CountableDrumrollNote } from '../note/lib/CountableDrumrollNote';
import { NoteType } from '../note/lib/NoteType';
import { Note } from '../note/Note';
import { DojoGauge } from './DojoGauge';
import { DojoGaugeIncrementMethod } from './lib/DojoGaugeIncrementMethod';
import { DojoGaugeTotal } from './lib/DojoGaugeTotal';
import { Style } from './lib/Style';

/**
 * Represents a single course variant (single or double) in a TJA chart file.
 */
export class CourseVariant {
  /**
   * Sets INIT value for the scoring method.
   */
  scoreInit: number = 390;

  /**
   * Sets DIFF value for the scoring method.
   */
  scoreDiff: number = 100;

  private _singleCommands: Command[] = [];

  private _player1Commands: Command[] = [];

  private _player2Commands: Command[] = [];

  /**
   * Comma separated array of integers for Balloon notes (7) and Kusudama notes
   * (9). Required when balloon notes appear in the course. Amount of values in
   * the array should correspond to the amount of balloons in the course. The
   * balloon values are used as they appear in the chart and the values have to
   * be repeated when branches are used.
   */
  balloonCounts: number[] = [];

  /**
   * Comma separated array of integers for Balloon notes (7) and Kusudama notes
   * (9) for each branch in a course with diverge notes. Follows the same set of
   * rules as the `balloonCounts` property.
   */
  branchBalloonCounts: Record<BranchType, number[]> = {
    [BranchType.Normal]: [],
    [BranchType.Advanced]: [],
    [BranchType.Master]: [],
  };

  /**
   * Play the song notation after next #START depending on if playing in
   * singleplayer or multiplayer.
   */
  style: Style = Style.Single;

  /**
   * Hide the diverge notes indication on the song selection screen and current
   * branch in the game until branching actually starts.
   */
  hiddenBranches: boolean = false;

  // DOJO PROPERTIES START

  /**
   * Information related to the 3 gauges in a dojo course.
   */
  gauges: [DojoGauge | null, DojoGauge | null, DojoGauge | null] = [
    null,
    null,
    null,
  ];

  /**
   * Gauge increment method, performing rounding with each note that is hit.
   */
  gaugeIncrementMethod?: DojoGaugeIncrementMethod;

  /**
   * Percentage multiplier for amount of notes in the song notation that is
   * applied to gauge calculation.
   */
  gaugeTotal?: DojoGaugeTotal;

  // DOJO PROPERTIES END

  /**
   * Whether the course has branches. This is not affected by the
   * `hiddenBranches` property.
   */
  hasBranches: boolean = false;

  /**
   * Whether the course has balloon or kusudama notes.
   */
  hasBalloonNotes: boolean = false;

  /**
   * Whether the course has any kind of drumroll notes. Balloon notes are not
   * included.
   */
  hasDrumroll: boolean = false;

  private _currentBalloonNoteIndex = 0;
  private _currentBranchType: BranchType | null = null;

  /**
   * Returns the command buffer. When the course variant has the Single style,
   * the command buffer for the single variant will be returned. Otherwise, the
   * command buffer for the specified player will be returned, or the first
   * player's command buffer if no player is specified.
   *
   * @param player - An optional player to get the command buffer for when the
   * course variant has the Double style. If not provided, P1 commands will be
   * returned.
   * @returns An array of commands and note sequences.
   */
  getCommands(player?: Player) {
    if (this.style === Style.Single) {
      return this._singleCommands;
    }

    switch (player) {
      case Player.Player1:
      case undefined:
        return this._player1Commands;
      case Player.Player2:
        return this._player2Commands;
    }
  }

  /**
   * Converts the course variant into TJA format.
   * @returns - A string that will correspond to a single course variant in a
   * TJA file.
   */
  toString(): string {
    const builder = new StringBuilder()
      .withSeparator('\n')
      .append(`${CourseMetadataProperty.Style}:${this.style}`)
      .append(`${CourseMetadataProperty.ScoreInit}:${this.scoreInit}`)
      .append(`${CourseMetadataProperty.ScoreDiff}:${this.scoreDiff}`);

    if (this.balloonCounts.length > 0) {
      builder.append(
        `${CourseMetadataProperty.Balloon}:${this.balloonCounts.join(',')}`,
      );
    }

    if (this.branchBalloonCounts[BranchType.Normal].length > 0) {
      builder.append(
        `${CourseMetadataProperty.BalloonNor}:${this.branchBalloonCounts[
          BranchType.Normal
        ].join(',')}`,
      );
    }

    if (this.branchBalloonCounts[BranchType.Advanced].length > 0) {
      builder.append(
        `${CourseMetadataProperty.BalloonExp}:${this.branchBalloonCounts[
          BranchType.Advanced
        ].join(',')}`,
      );
    }

    if (this.branchBalloonCounts[BranchType.Master].length > 0) {
      builder.append(
        `${CourseMetadataProperty.BalloonMas}:${this.branchBalloonCounts[
          BranchType.Advanced
        ].join(',')}`,
      );
    }

    if (this.hiddenBranches) {
      builder.append(`${CourseMetadataProperty.HiddenBranch}:1`);
    }

    if (this.gauges[0]) {
      builder.append(
        `${CourseMetadataProperty.Exam1}:${this.gauges[0].toString()}`,
      );
    }

    if (this.gauges[1]) {
      builder.append(
        `${CourseMetadataProperty.Exam2}:${this.gauges[1].toString()}`,
      );
    }

    if (this.gauges[2]) {
      builder.append(
        `${CourseMetadataProperty.Exam3}:${this.gauges[2].toString()}`,
      );
    }

    if (this.gaugeIncrementMethod) {
      builder.append(
        `${CourseMetadataProperty.GaugeIncr}:${this.gaugeIncrementMethod}`,
      );
    }

    if (this.gaugeTotal) {
      builder.append(`${CourseMetadataProperty.Total}:${this.gaugeTotal}`);
    }

    builder.append('\n');

    this._singleCommands.forEach((command) => {
      builder.append(command.toString());
    });

    this._player1Commands.forEach((command) => {
      builder.append(command.toString());
    });

    this._player2Commands.forEach((command) => {
      builder.append(command.toString());
    });

    return builder.toString();
  }

  /**
   * Add a command to the command buffer.
   * @param command - The command object to add.
   */
  addCommand(command: Command, player: Player) {
    if (this.style === Style.Single) {
      this._singleCommands.push(command);
    } else {
      switch (player) {
        case Player.Player1:
          this._player1Commands.push(command);
          break;
        case Player.Player2:
          this._player2Commands.push(command);
          break;
      }
    }

    this.postProcessCommand(command);
  }

  /**
   * Checks whether all command buffers are empty. This is useful for filtering
   * out course variants that aren't actually part of the TJA file.
   * @returns True if all command buffers are empty, false otherwise.
   */
  isEmpty(): boolean {
    return (
      this._singleCommands.length === 0 &&
      this._player1Commands.length === 0 &&
      this._player2Commands.length === 0
    );
  }

  /**
   * Sets the gauge at a given index to the provided gauge data.
   * @param index - The index to set.
   * @param gauge - The gauge data.
   */
  setGauge(index: number, gauge: DojoGauge) {
    this.gauges[index] = gauge;
  }

  private postProcessCommand(command: Command) {
    if (command.commandType === CommandType.BranchStart) {
      this.hasBranches = true;
      return;
    }

    if (command.commandType === CommandType.BranchMarker) {
      this._currentBranchType = (command as BranchMarkerCommand).branchType;
      this._currentBalloonNoteIndex = 0;
      return;
    }

    if (command.commandType === CommandType.NoteSequence) {
      for (const note of (command as NoteSequence).notes) {
        this.postProcessNote(note);
      }

      return;
    }
  }

  private postProcessNote(note: Note) {
    if (
      note.noteType === NoteType.Balloon ||
      note.noteType === NoteType.Kusudama
    ) {
      return this.postProcessBalloonNote(note as CountableDrumrollNote);
    }

    if (
      note.noteType === NoteType.Drumroll ||
      note.noteType === NoteType.DRUMROLL
    ) {
      this.hasDrumroll = true;
      return;
    }
  }

  private postProcessBalloonNote(note: CountableDrumrollNote) {
    this.hasBalloonNotes = true;

    let counts = this.balloonCounts;

    if (this._currentBranchType) {
      counts = this.branchBalloonCounts[this._currentBranchType];
    }

    note.count = this.getBalloonCount(counts, this._currentBalloonNoteIndex);
  }

  private getBalloonCount(source: number[], index: number) {
    if (index >= source.length) {
      return 0;
    }

    return source[index];
  }
}
