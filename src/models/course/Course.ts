import { StringBuilder } from '../../utils/StringBuilder';
import { Command } from '../command/Command';
import { CommandType } from '../command/lib/CommandType';
import { StartCommand } from '../command/types';
import { CourseMetadataProperty } from '../common/MetadataProperty';
import { Player } from '../common/Player';
import { CourseVariant } from './CourseVariant';
import { DojoGauge } from './DojoGauge';
import { Difficulty } from './lib/Difficulty';
import { Style } from './lib/Style';

/**
 * Represents a course in a song.
 */
export class Course {
  /**
   * The difficulty of the course.
   */
  difficulty: Difficulty = Difficulty.Oni;

  /**
   * The star rating of the course. It is an integer between 1 and 10.
   */
  stars: number = 10;

  /**
   * The SINGLE style course variant of this course.
   */
  singleCourse: CourseVariant = new CourseVariant();

  /**
   * The DOUBLE style course variant of this course.
   */
  doubleCourse: CourseVariant = new CourseVariant();

  private _activeCourseStyle = Style.Single;
  private _activePlayer = Player.Player1;

  /**
   * Returns the currently selected course variant. It is determined by the
   * active course style.
   */
  get activeCourse(): CourseVariant {
    return this._activeCourseStyle === Style.Single
      ? this.singleCourse!
      : this.doubleCourse!;
  }

  /**
   * Sets the active course style. The `activeCourse` getter will return the
   * course variant based on this style value.
   */
  set activeCourseStyle(style: Style) {
    this._activeCourseStyle = style;
  }

  /**
   * Add a command to the command buffer of the active course variant.
   * @param command - The command object to add.
   */
  addCommand(command: Command) {
    if (command.commandType === CommandType.Start) {
      const startCommand = command as StartCommand;

      if (startCommand.player) {
        this._activePlayer = startCommand.player;
      }
    }

    this.activeCourse.addCommand(command, this._activePlayer);
  }

  /**
   * Sets the gauge at a given index to the provided gauge data on the active
   * course variant.
   * @param index - The index to set.
   * @param gauge - The gauge data.
   */
  setGauge(index: number, gauge: DojoGauge) {
    this.activeCourse.setGauge(index, gauge);
  }

  /**
   * Converts the course data into TJA format.
   * @returns - A string that will correspond to a single course in a TJA file.
   */
  toString(): string {
    const builder = new StringBuilder()
      .withSeparator('\n')
      .append(`${CourseMetadataProperty.Course}:${this.difficulty}`)
      .append(`${CourseMetadataProperty.Level}:${this.stars}`)
      .append('\n');

    if (!this.singleCourse.isEmpty()) {
      builder.append(this.singleCourse.toString()).append('\n');
    }

    if (!this.doubleCourse.isEmpty()) {
      builder.append(this.doubleCourse.toString()).append('\n');
    }

    return builder.toString();
  }
}
