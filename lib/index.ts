import { Player } from "./player";
import { Game } from "./game";
import { CLI } from "./cli";
import { State } from "./state";

const cli = new CLI();

cli.getPlayerData();

cli.on("players", ({ p1, p2 }: { p1: Player; p2: Player }) => {
    cli.startGame(p1, p2);
});

cli.on(
    "new game",
    ({
        p1,
        p2,
        game,
        state,
    }: {
        p1: Player;
        p2: Player;
        game: Game;
        state: State;
    }) => {
        cli.questionPlayer(state);

        cli.rl.on("close", () => {
            process.exit();
        });
        cli.rl.on("line", (value: string) => {
            if (value.match(/^[0-9]+$/)) {
                const inputValue = parseInt(value);
                cli.handleInputValue(inputValue, game, state);
            } else if (value === "exit") {
                cli.rl.close();
            } else if (value === "restart") {
                console.log(value);
            }
        });
    }
);
