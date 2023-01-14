import { Command } from './Command';
import { SPACE_REGEX } from '../../common/regex';
import { BranchType } from './lib/BranchType';
import { commandClassMap } from './lib/commandClassMap';
import { BranchMarkerCommand, NoteSequence } from './types';

export class CommandFactory {
  static fromLine(
    line: string,
    canParseNotes: boolean,
    strict: boolean = true,
  ): Command | undefined {
    line = line.trim();

    if (line.length === 0) {
      return undefined;
    }

    if (!line.startsWith('#') && canParseNotes) {
      return NoteSequence.parse([line], strict);
    }

    const components = line.split(SPACE_REGEX);

    const command = components[0].substring(1);
    const args = components.slice(1);

    if (!Object.keys(commandClassMap).includes(command)) {
      return undefined;
    }

    const commandClass =
      commandClassMap[command as keyof typeof commandClassMap];

    if (commandClass === BranchMarkerCommand) {
      return commandClass.parse(command as BranchType);
    } else {
      return commandClass.parse(args as any, strict);
    }
  }
}
