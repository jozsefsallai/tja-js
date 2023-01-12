import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Shows song lyrics at the bottom of the screen until the next #LYRIC command.
 * Line breaks can be added with `\n`. Has to be repeated for each difficulty.
 * Can be placed in the middle of a measure. If `LYRICS` is defined in the
 * song metadata, this will be ignored.
 *
 * **Example:**
 *
 * ```
 * #LYRIC ケロッ！ケロッ！ケロッ！いざ進め〜ッ
 * ```
 */
export class LyricCommand extends Command {
  line: string;

  constructor(line: string) {
    super(CommandType.Lyric);
    this.line = line;
  }

  static parse(args: string[]): LyricCommand | undefined {
    return new LyricCommand(args.join(' '));
  }

  toString(): string {
    return `${super.toString()} ${this.line}`;
  }
}
