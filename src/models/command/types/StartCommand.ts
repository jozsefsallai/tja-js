import { Player } from '../../common/Player';
import { Command } from '../Command';
import { CommandType } from '../lib/CommandType';

/**
 * Marks the beginning of the course. If this command has the arguments "P1" or
 * "P2", it will mark it as the chart for the first or second player
 * respectively, but only if same difficulty is picked by both players.
 */
export class StartCommand extends Command {
  player?: Player;

  constructor(player?: Player) {
    super(CommandType.Start);
    this.player = player;
  }

  static parse(args: string[]): StartCommand | undefined {
    const command = new StartCommand();

    if (args.length > 0) {
      const player = args[0].toUpperCase();

      switch (player) {
        case 'P1':
          command.player = Player.Player1;
          break;
        case 'P2':
          command.player = Player.Player2;
          break;
      }
    }

    return command;
  }

  toString(): string {
    let playerString;

    switch (this.player) {
      case Player.Player1:
        playerString = 'P1';
        break;
      case Player.Player2:
        playerString = 'P2';
        break;
    }

    if (playerString) {
      return `${super.toString()} ${playerString}`;
    } else {
      return super.toString();
    }
  }
}
