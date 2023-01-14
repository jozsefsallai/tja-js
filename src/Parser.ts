import { AUTHOR_REGEX, LINE_REGEX } from './common/regex';
import {
  CourseMetadataProperty,
  SongMetadataProperty,
} from './models/common/MetadataProperty';
import { Course } from './models/course/Course';
import { Game } from './models/song/lib/Game';
import { ScoreMode } from './models/song/lib/ScoreMode';
import { Side } from './models/song/lib/Side';
import { Song } from './models/song/Song';
import { Queue } from './utils/Queue';
import { Command } from './models/command/Command';
import { CommandType } from './models/command/lib/CommandType';
import { Difficulty } from './models/course/lib/Difficulty';
import { CommandFactory } from './models/command/CommandFactory';
import { BranchType } from './models/command/lib/BranchType';
import { Style } from './models/course/lib/Style';
import { DojoGauge } from './models/course/DojoGauge';
import { DojoGaugeIncrementMethod } from './models/course/lib/DojoGaugeIncrementMethod';
import { DojoGaugeTotal } from './models/course/lib/DojoGaugeTotal';

/**
 * TJAParser is a class that parses a TJA file into a Song object. TJA is the
 * file format used by Taiko simulators for defining chart data.
 */
export class TJAParser {
  /**
   * Takes in the contents of a TJA file, parses it line-by-line, and returns a
   * Song object. Throws if `strict` is set to `true`.
   *
   * @param raw - The contents of the TJA file.
   * @param strict - Whether the parser should throw errors on invalid data.
   * @returns - A Song object containing data about a chart file.
   */
  static parse(raw: string, strict: boolean = true): Song {
    const lines = raw.split(LINE_REGEX).map((l) => l.trim().split('//')[0]);
    const queue = Queue.fromArray(lines);

    const song = new Song();

    let isParsingCourseData = false;
    let canParseNotes = false;

    while (!queue.isEmpty) {
      const line = queue.dequeue();

      if (line === undefined || line.length === 0) {
        continue;
      }

      const params = TJAParser.parseParameter(line);

      if (params) {
        const [key, value] = params;

        if (value.length === 0) {
          continue;
        }

        canParseNotes = false;

        if (key === CourseMetadataProperty.Course) {
          isParsingCourseData = true;
          song.courses.push(new Course());
        }

        if (!isParsingCourseData) {
          TJAParser.setSongData(song, key, value, strict);
          continue;
        }

        const course = song.courses[song.courses.length - 1];
        if (typeof course === 'undefined') {
          continue;
        }

        TJAParser.setCourseData(course, key, value, strict);
        continue;
      }

      const course = song.courses[song.courses.length - 1];
      if (typeof course === 'undefined') {
        continue;
      }

      const command = TJAParser.parseCourseCommand(
        course,
        line,
        canParseNotes,
        strict,
      );
      if (command && command.commandType === CommandType.Start) {
        canParseNotes = true;
      }
    }

    return song;
  }

  private static setSongData(
    song: Song,
    key: string,
    value: string,
    strict: boolean,
  ) {
    if (key === SongMetadataProperty.Title) {
      song.title = value;
      return;
    }

    if (key === SongMetadataProperty.TitleEN) {
      song.localizedTitle.en = value;
      return;
    }

    if (key === SongMetadataProperty.TitleJA) {
      song.localizedTitle.ja = value;
      return;
    }

    if (key === SongMetadataProperty.TitleCN) {
      song.localizedTitle.cn = value;
      return;
    }

    if (key === SongMetadataProperty.TitleTW) {
      song.localizedTitle.tw = value;
      return;
    }

    if (key === SongMetadataProperty.TitleKO) {
      song.localizedTitle.ko = value;
      return;
    }

    if (key === SongMetadataProperty.Subtitle) {
      song.subtitle = value;
      return;
    }

    if (key === SongMetadataProperty.SubtitleEN) {
      song.localizedSubtitle.en = value;
      return;
    }

    if (key === SongMetadataProperty.SubtitleJA) {
      song.localizedSubtitle.ja = value;
      return;
    }

    if (key === SongMetadataProperty.SubtitleCN) {
      song.localizedSubtitle.cn = value;
      return;
    }

    if (key === SongMetadataProperty.SubtitleTW) {
      song.localizedSubtitle.tw = value;
      return;
    }

    if (key === SongMetadataProperty.SubtitleKO) {
      song.localizedSubtitle.ko = value;
      return;
    }

    if (key === SongMetadataProperty.BPM) {
      const bpm = parseFloat(value);
      if (!isNaN(bpm)) {
        song.bpm = bpm;
      } else if (strict) {
        throw new TypeError(`Invalid BPM value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.Wave) {
      song.wave = value;
      return;
    }

    if (key === SongMetadataProperty.Offset) {
      const offset = parseFloat(value);
      if (!isNaN(offset)) {
        song.offset = offset;
      } else if (strict) {
        throw new TypeError(`Invalid offset value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.DemoStart) {
      const demoStart = parseFloat(value);
      if (!isNaN(demoStart)) {
        song.demoStart = demoStart;
      } else if (strict) {
        throw new TypeError(`Invalid demo start value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.Genre) {
      song.genre = value;
      return;
    }

    if (key === SongMetadataProperty.ScoreMode) {
      const mode = ScoreMode.fromRaw(value, strict);
      if (mode) {
        song.scoreMode = mode;
      }
      return;
    }

    if (key === SongMetadataProperty.Maker) {
      const data = AUTHOR_REGEX.exec(value);
      if (data !== null) {
        song.maker = {
          name: data[1],
          url: data[2],
        };
      }
      return;
    }

    if (key === SongMetadataProperty.Lyrics) {
      song.lyricsFilePath = value;
      return;
    }

    if (key === SongMetadataProperty.SongVol) {
      const volume = parseInt(value, 10);
      if (!isNaN(volume)) {
        song.songVolume = volume;
      } else if (strict) {
        throw new TypeError(`Invalid song volume value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.SEVol) {
      const volume = parseInt(value, 10);
      if (!isNaN(volume)) {
        song.soundEffectVolume = volume;
      } else if (strict) {
        throw new TypeError(`Invalid sound effect volume value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.Side) {
      const side = Side.fromRaw(value, strict);
      if (side) {
        song.side = side;
      }
      return;
    }

    if (key === SongMetadataProperty.Life) {
      const life = parseInt(value, 10);
      if (!isNaN(life)) {
        song.life = life;
      } else if (strict) {
        throw new TypeError(`Invalid life value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.Game) {
      const game = Game.fromRaw(value, strict);
      if (game) {
        song.game = game;
      }
      return;
    }

    if (key === SongMetadataProperty.HeadScroll) {
      const headScroll = parseInt(value, 10);
      if (!isNaN(headScroll)) {
        song.headScroll = headScroll;
      } else if (strict) {
        throw new TypeError(`Invalid head scroll value: ${value}`);
      }
      return;
    }

    if (key === SongMetadataProperty.BGImage) {
      song.backgroundImagePath = value;
      return;
    }

    if (key === SongMetadataProperty.BGMovie) {
      song.backgroundMoviePath = value;
      return;
    }

    if (key === SongMetadataProperty.MovieOffset) {
      const movieOffset = parseInt(value, 10);
      if (!isNaN(movieOffset)) {
        song.movieOffset = movieOffset;
      } else if (strict) {
        throw new TypeError(`Invalid movie offset value: ${value}`);
      }
      return;
    }
  }

  private static setCourseData(
    course: Course,
    key: string,
    value: string,
    strict: boolean,
  ) {
    if (key === CourseMetadataProperty.Course) {
      const difficulty = Difficulty.fromRaw(value, strict);
      if (difficulty) {
        course.difficulty = difficulty;
      }
      return;
    }

    if (key === CourseMetadataProperty.Level) {
      const level = parseInt(value, 10);
      if (!isNaN(level)) {
        course.stars = level;
      } else if (strict) {
        throw new TypeError(`Invalid course level value: ${value}`);
      }
      return;
    }

    if (key === CourseMetadataProperty.ScoreInit) {
      const scoreInit = parseInt(value, 10);
      if (!isNaN(scoreInit)) {
        course.activeCourse.scoreInit = scoreInit;
      } else if (strict) {
        throw new TypeError(`Invalid course score init value: ${value}`);
      }
      return;
    }

    if (key === CourseMetadataProperty.ScoreDiff) {
      const scoreDiff = parseInt(value, 10);
      if (!isNaN(scoreDiff)) {
        course.activeCourse.scoreDiff = scoreDiff;
      } else if (strict) {
        throw new TypeError(`Invalid course score diff value: ${value}`);
      }
      return;
    }

    if (key === CourseMetadataProperty.Balloon) {
      const counts = value
        .split(',')
        .filter((c) => c.trim().length > 0)
        .map((c) => parseInt(c.trim(), 10));
      const filteredCounts = counts.filter((c) => !isNaN(c));

      if (filteredCounts.length === counts.length) {
        course.activeCourse.balloonCounts = filteredCounts;
      } else if (strict) {
        throw new TypeError(`Invalid course balloon value: ${value}`);
      }

      return;
    }

    if (key === CourseMetadataProperty.BalloonNor) {
      const counts = value.split(',').map((c) => parseInt(c.trim(), 10));
      const filteredCounts = counts.filter((c) => !isNaN(c));

      if (filteredCounts.length === counts.length) {
        course.activeCourse.branchBalloonCounts[BranchType.Normal] =
          filteredCounts;
      } else if (strict) {
        throw new TypeError(`Invalid course balloon (normal) value: ${value}`);
      }

      return;
    }

    if (key === CourseMetadataProperty.BalloonExp) {
      const counts = value.split(',').map((c) => parseInt(c.trim(), 10));
      const filteredCounts = counts.filter((c) => !isNaN(c));

      if (filteredCounts.length === counts.length) {
        course.activeCourse.branchBalloonCounts[BranchType.Advanced] =
          filteredCounts;
      } else if (strict) {
        throw new TypeError(
          `Invalid course balloon (advanced) value: ${value}`,
        );
      }

      return;
    }

    if (key === CourseMetadataProperty.BalloonMas) {
      const counts = value.split(',').map((c) => parseInt(c.trim(), 10));
      const filteredCounts = counts.filter((c) => !isNaN(c));

      if (filteredCounts.length === counts.length) {
        course.activeCourse.branchBalloonCounts[BranchType.Master] =
          filteredCounts;
      } else if (strict) {
        throw new TypeError(`Invalid course balloon (master) value: ${value}`);
      }

      return;
    }

    if (key === CourseMetadataProperty.Style) {
      const style = Style.fromRaw(value, strict);
      if (style) {
        course.activeCourseStyle = style;
        course.activeCourse.style = style;
      }
      return;
    }

    if (
      [
        CourseMetadataProperty.Exam1,
        CourseMetadataProperty.Exam2,
        CourseMetadataProperty.Exam3,
      ].includes(key as CourseMetadataProperty)
    ) {
      const index = parseInt(key.slice(-1), 10) - 1;
      const gauge = DojoGauge.parse(value, strict);
      if (gauge) {
        course.setGauge(index, gauge);
      } else if (strict) {
        throw new TypeError(`Invalid gauge data: ${value}`);
      }

      return;
    }

    if (key === CourseMetadataProperty.GaugeIncr) {
      const gaugeIncrementMethod = DojoGaugeIncrementMethod.fromRaw(
        value,
        strict,
      );
      if (gaugeIncrementMethod) {
        course.activeCourse.gaugeIncrementMethod = gaugeIncrementMethod;
      }
      return;
    }

    if (key === CourseMetadataProperty.Total) {
      const rawTotal = parseInt(value, 10);
      if (!isNaN(rawTotal)) {
        const total = new DojoGaugeTotal(rawTotal);
        course.activeCourse.gaugeTotal = total;
      } else if (strict) {
        throw new TypeError(`Invalid gauge total value: ${value}`);
      }
      return;
    }

    if (key === CourseMetadataProperty.HiddenBranch && value === '1') {
      course.activeCourse.hiddenBranches = true;
      return;
    }
  }

  private static parseCourseCommand(
    course: Course,
    line: string,
    canParseNotes: boolean,
    strict: boolean,
  ): Command | undefined {
    const command = CommandFactory.fromLine(line, canParseNotes, strict);

    if (typeof command !== 'undefined') {
      course.addCommand(command);
      return command;
    }
  }

  private static parseParameter(line: string): [string, string] | undefined {
    const components = line.split(':').map((c) => c.trim());

    if (components.length < 2) {
      return undefined;
    }

    const key = components[0];
    const value = components.slice(1).join(':');

    return [key, value];
  }
}
