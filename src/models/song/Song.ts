import { StringBuilder } from '../../utils/StringBuilder';
import { SongMetadataProperty } from '../common/MetadataProperty';
import { Course } from '../course/Course';
import { Game } from './lib/Game';
import { ScoreMode } from './lib/ScoreMode';
import { Side } from './lib/Side';

/**
 * Represents data about a TJA chart file.
 */
export class Song {
  /**
   * Song's title that appears on song selection, in the game, and on the
   * results screen.
   */
  title: string = 'untitled';

  /**
   * Localized versions of the title. If a localized title exists, it will be
   * used instead of the `title` property if a user has their game language set
   * to the corresponding language. Supported languages are: Japanese (ja),
   * English (en), Chinese Simplified (cn), Chinese Traditional (tw), and Korean
   * (ko).
   */
  localizedTitle: {
    ja?: string;
    en?: string;
    cn?: string;
    tw?: string;
    ko?: string;
  } = {};

  /**
   * The sub-title that appears on the selected song in song selection that may
   * explain the origin of the song, such as the originating media or the lead
   * singer.
   *
   * Adding `--` or `++` at the beginning changes the appearance of the subtitle
   * on the results screen by either hiding (`--`) or showing it (`++`) next to
   * the title.
   */
  subtitle?: string;

  /**
   * Localized versions of the subtitle. If a localized subtitle exists, it will
   * be used instead of the `subtitle` property if a user has their game
   * language set to the corresponding language. Supported languages are:
   * Japanese (ja), English (en), Chinese Simplified (cn), Chinese Traditional
   * (tw), Korean (ko).
   */
  localizedSubtitle: {
    ja?: string;
    en?: string;
    cn?: string;
    tw?: string;
    ko?: string;
  } = {};

  /**
   * Song's beats per minute. Defaults to 120.
   *
   * The following formula is used: `BPM = MEASURE / SIGN * 4`, where MEASURE is
   * amount of measures per minute and SIGN is the time signature, eg. 4 / 4 if
   * the current time signature is common.
   *
   * @default 120
   */
  bpm: number = 120;

  /**
   * The audio file that plays in the background, should be in the same
   * directory as the TJA file. If omitted, no music plays in the background.
   */
  wave?: string;

  /**
   * Floating point value for chart offset in seconds. Negative values will
   * delay notes, positive will cause them to appear sooner.
   *
   * @default 0.0
   */
  offset: number = 0.0;

  /**
   * Offset of song preview during song selection in seconds.
   *
   * @default 0.0
   */
  demoStart: number = 0.0;

  /**
   * Song's genre that controls where the song appears in the song selection.
   */
  genre?: string;

  /**
   * Scoring method that affects the final score. All scores are divided by 10,
   * rounded towards negative infinity, then multiplied by 10.
   *
   * @default ScoreMode.AC_1_TO_AC_7
   */
  scoreMode: ScoreMode = ScoreMode.AC_1_TO_AC_7;

  /**
   * Information about the chart's creator. When provided, the `name` property
   * must always be defined. Additionally, the creator field can contain a URL
   * between angle brackets.
   *
   * **Example:**
   *
   * ```
   * MAKER:名無し <https://example.com>
   * ```
   */
  maker?: {
    /**
     * The name of the chart's creator.
     */
    name: string;

    /**
     * An optional URL address to a web page related to the chart's creator.
     */
    url?: string;
  };

  /**
   * Path to a timed WEBVTT lyrics file, usually with a .vtt extension. This
   * will disable the `#LYRIC` commands in courses.
   */
  lyricsFilePath?: string;

  /**
   * Music volume percentage.
   *
   * @default 100
   */
  songVolume: number = 100;

  /**
   * Sound effect volume percentage.
   *
   * @default 100
   */
  soundEffectVolume: number = 100;

  /**
   * Value can be either:
   * - "Normal" or "1"
   * - "Ex" or "2"
   * - "Both" or "3"
   *
   * Value of "Normal" and "1" makes the song appear when song selection is in
   * the default mode. "Ex" and "2" hides the song from default song selection.
   * - The song appears after the user presses the buttons for next song and
   * previous song 20 times alternatingly (10 for each button).
   *
   * Default is "Both", making the song appear during song selection in both
   * modes.
   *
   * @default Side.Both
   */
  side: Side = Side.Both;

  /**
   * Amount of misses that are allowed to be made before interrupting the game
   * and immediately showing the results screen. Removes the gauge, replacing it
   * with lit up souls that fade one by one after missing a note. The amount is
   * not limited, but only 16 souls fit on screen. Default is 0, which does not
   * limit the misses and will play until the end.
   *
   * @default 0
   */
  life: number = 0;

  /**
   * Value can be either "Taiko" or "Jube". Game will be forced to autoplay mode
   * with "Jube" value. Default is "Taiko".
   *
   * @default Game.Taiko
   */
  game: Game = Game.Taiko;

  /**
   * Initial game scrolling speed. `#SCROLL` command in a song notation will be
   * a multiple of this value.
   */
  headScroll?: number;

  /**
   * A limited song skin that combines donbg and songbg into a single image.
   */
  backgroundImagePath?: string;

  /**
   * Video file that is played in the background during the gameplay.
   */
  backgroundMoviePath?: string;

  /**
   * Floating point offset of video file's starting position in seconds. Cannot
   * be a negative number.
   */
  movieOffset?: number;

  /**
   * Array of courses contained in this TJA chart file.
   */
  courses: Course[] = [];

  /**
   * Adds a course to the song data.
   *
   * @param course - The course object to add.
   */
  addCourse(course: Course) {
    this.courses.push(course);
  }

  /**
   * Converts the song data into TJA format.
   * @returns - A string that will correspond to a TJA file.
   */
  toString(): string {
    const builder = new StringBuilder()
      .withSeparator('\n')
      .append(`${SongMetadataProperty.Title}:${this.title}`);

    if (this.localizedTitle.ja) {
      builder.append(
        `${SongMetadataProperty.TitleJA}:${this.localizedTitle.ja}`,
      );
    }

    if (this.localizedTitle.en) {
      builder.append(
        `${SongMetadataProperty.TitleEN}:${this.localizedTitle.en}`,
      );
    }

    if (this.localizedTitle.cn) {
      builder.append(
        `${SongMetadataProperty.TitleCN}:${this.localizedTitle.cn}`,
      );
    }

    if (this.localizedTitle.tw) {
      builder.append(
        `${SongMetadataProperty.TitleTW}:${this.localizedTitle.tw}`,
      );
    }

    if (this.localizedTitle.ko) {
      builder.append(
        `${SongMetadataProperty.TitleKO}:${this.localizedTitle.ko}`,
      );
    }

    if (this.subtitle) {
      builder.append(`${SongMetadataProperty.Subtitle}:${this.subtitle}`);
    }

    if (this.localizedSubtitle.ja) {
      builder.append(
        `${SongMetadataProperty.SubtitleJA}:${this.localizedSubtitle.ja}`,
      );
    }

    if (this.localizedSubtitle.en) {
      builder.append(
        `${SongMetadataProperty.SubtitleEN}:${this.localizedSubtitle.en}`,
      );
    }

    if (this.localizedSubtitle.cn) {
      builder.append(
        `${SongMetadataProperty.SubtitleCN}:${this.localizedSubtitle.cn}`,
      );
    }

    if (this.localizedSubtitle.tw) {
      builder.append(
        `${SongMetadataProperty.SubtitleTW}:${this.localizedSubtitle.tw}`,
      );
    }

    if (this.localizedSubtitle.ko) {
      builder.append(
        `${SongMetadataProperty.SubtitleKO}:${this.localizedSubtitle.ko}`,
      );
    }

    builder.append(`${SongMetadataProperty.BPM}:${this.bpm}`);

    if (this.wave) {
      builder.append(`${SongMetadataProperty.Wave}:${this.wave}`);
    }

    builder
      .append(`${SongMetadataProperty.Offset}:${this.offset}`)
      .append(`${SongMetadataProperty.DemoStart}:${this.demoStart}`);

    if (this.genre) {
      builder.append(`${SongMetadataProperty.Genre}:${this.genre}`);
    }

    builder.append(`${SongMetadataProperty.ScoreMode}:${this.scoreMode}`);

    if (this.maker) {
      if (this.maker.url) {
        builder.append(
          `${SongMetadataProperty.Maker}:${this.maker.name} <${this.maker.url}>`,
        );
      } else {
        builder.append(`${SongMetadataProperty.Maker}:${this.maker.name}`);
      }
    }

    if (this.lyricsFilePath) {
      builder.append(`${SongMetadataProperty.Lyrics}:${this.lyricsFilePath}`);
    }

    builder
      .append(`${SongMetadataProperty.SongVol}:${this.songVolume}`)
      .append(`${SongMetadataProperty.SEVol}:${this.soundEffectVolume}`)
      .append(`${SongMetadataProperty.Side}:${this.side}`)
      .append(`${SongMetadataProperty.Life}:${this.life}`)
      .append(`${SongMetadataProperty.Game}:${this.game}`);

    if (this.headScroll) {
      builder.append(`${SongMetadataProperty.HeadScroll}:${this.headScroll}`);
    }

    if (this.backgroundImagePath) {
      builder.append(
        `${SongMetadataProperty.BGImage}:${this.backgroundImagePath}`,
      );
    }

    if (this.backgroundMoviePath) {
      builder.append(
        `${SongMetadataProperty.BGMovie}:${this.backgroundMoviePath}`,
      );
    }

    if (this.movieOffset) {
      builder.append(`${SongMetadataProperty.MovieOffset}:${this.movieOffset}`);
    }

    builder.append('\n');

    this.courses.forEach((course) => {
      builder.append(course.toString());
    });

    builder.append('\n');

    return builder.toString();
  }
}
