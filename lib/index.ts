import { Player } from "./player";
import { Game } from "./game";
import { CLI } from "./cli";
import { State } from "./state";

interface NewGameType {
    game: Game;
    state: State;
}

const cli = new CLI();
const commands = ["exit", "help", "printboard", "continue", "wincondition"];

cli.getPlayerData();

cli.on("players", ({ p1, p2 }: { p1: Player; p2: Player }) => {
    cli.startGame(p1, p2);
});

cli.on("new game", gameplay);

function gameplay({ game, state }: NewGameType) {
    cli.questionPlayer(state);

    cli.rl.on("close", () => {
        process.exit();
    });
    cli.rl.on("line", (value: string) => {
        if (value.match(/^[0-9]+$/)) {
            cli.handleInputValue(parseInt(value), game, state);
        } else if (value === commands[0]) {
            cli.rl.close();
        } else if (value === commands[1]) {
            cli.help(commands);
        } else if (value === commands[2]) {
            cli.printBoard(game);
        } else if (value === commands[3]) {
            cli.questionPlayer(state);
        } else if (value === commands[4]) {
            cli.setWinCondition(game, state);
        } else {
            cli.questionMark();
        }
    });
}
