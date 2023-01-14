import { ESCAPED_COMMA_REGEX, PIPE_REGEX } from '../../../common/regex';
import { Course } from '../../course/Course';
import { Difficulty } from '../../course/lib/Difficulty';
import { Song } from '../../song/Song';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Changes song when `COURSE`: is set to "Dan" or "6". Value is a comma
 * separated array, with these values, all of which are required:
 * - Song title
 * - Song subtitle
 * - Song genre
 * - Audio filename
 * - ScoreInit
 * - ScoreDiff
 * Comma character in the value can be escaped with a backslash character (`\`).
 *
 * **Example**:
 *
 * ```
 * #NEXTSONG GO!GO!明るい社会,うるまでるび,バラエティ,GO!GO!明るい社会.ogg,560,160
 * ```
 */
export class NextSongCommand extends Command {
  /**
   * The details of the song. Note: this isn't a real `Song` object, just one
   * that contains basic information about the song and only has a single Dan
   * course.
   */
  song: Song;

  constructor(song: Song) {
    super(CommandType.BMScroll);
    this.song = song;
  }

  static parse(args: string[]): NextSongCommand | undefined {
    if (args.length === 0) {
      return undefined;
    }

    const components = args[0]
      .replace(ESCAPED_COMMA_REGEX, '|')
      .split(',')
      .map((c) => c.replace(PIPE_REGEX, ','));

    if (components.length < 6) {
      return undefined;
    }

    const song = new Song();
    song.title = components[0];
    song.subtitle = components[1];
    song.genre = components[2];
    song.wave = components[3];

    const course = new Course();
    course.difficulty = Difficulty.Dan;
    course.activeCourse.scoreInit = parseInt(components[4], 10);
    course.activeCourse.scoreDiff = parseInt(components[5], 10);

    song.addCourse(course);

    return new NextSongCommand(song);
  }

  toString(): string {
    const songData = [
      this.song.title,
      this.song.subtitle,
      this.song.genre,
      this.song.wave,
      this.song.courses[0].activeCourse.scoreInit,
      this.song.courses[0].activeCourse.scoreDiff,
    ].join(',');

    return `${super.toString()} ${songData}`;
  }
}
