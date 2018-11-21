import readline from "readline";
import EventEmitter from "events";
import { Player } from "./player";
import { Board } from "./board";
import { Game } from "./game";
import { State } from "./state";

interface ICLI {
    rl: readline.Interface;
    config: {
        input: NodeJS.ReadStream;
        output: NodeJS.WritableStream;
        terminal: boolean;
    };
    prefix: string;
    getPlayerData(): void;
    startGame(p1: Player, p2: Player): void;
    questionPlayer(state: State): void;
    handleInputValue(inputValue: number, game: Game, state: State): void;
}

export class CLI extends EventEmitter implements ICLI {
    rl: readline.Interface;
    config: {
        input: NodeJS.ReadStream;
        output: NodeJS.WritableStream;
        terminal: boolean;
    };
    prefix: string;

    constructor() {
        super();
        this.config = {
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        };
        this.prefix = ">> ";
        this.rl = readline.createInterface(this.config);
        this.rl.setPrompt(this.prefix);
    }

    getPlayerData() {
        this.rl.question("Enter name of player 1 \n>> ", (p1name: string) => {
            const p1 = new Player(1, p1name);
            console.log(`Welcome ${p1.name}, symbol: ${p1.symbol}`);
            this.rl.question(
                "Enter name of player 2 \n>> ",
                (p2name: string) => {
                    const p2 = new Player(2, p2name);
                    console.log(`Welcome ${p2.name}, symbol: ${p2.symbol}`);
                    this.emit("players", { p1, p2 });
                }
            );
        });
    }

    startGame(p1: Player, p2: Player) {
        this.rl.question("Enter board size \n>> ", (size: string) => {
            const n = parseInt(size, 10);
            if (isNaN(n)) {
                console.warn("invalid board size");
                this.rl.close();
                return;
            }
            console.log(
                "\n💩 Setting default win condition to 3.\nIt's possible to change it, but it's completely untested.\n"
            );
            const board = new Board(n);
            const game = new Game(board);

            const state = new State(p1, p2);

            console.log("\n");
            board.print();
            console.log("\n");

            this.emit("new game", { game, state });
        });
    }

    handleInputValue(inputNumber: number, game: Game, state: State) {
        const currentPlayer = state.currentPlayer();
        switch (game.play(inputNumber, currentPlayer.symbol)) {
            case "next": {
                state.nextTurn();
                this.questionPlayer(state);
                break;
            }
            case "invalid": {
                this.questionPlayer(state);
                break;
            }
            case "draw": {
                console.log("DRAW!");
                this.rl.close();
            }
            case "win": {
                console.log(`Congrats! 🍕 ${currentPlayer.name}! You've won.`);
                this.rl.close();
                break;
            }
        }
    }

    questionPlayer(state: State) {
        this.rl.setPrompt(
            `${state.currentPlayer().name}, choose a box to place an '${
                state.currentPlayer().symbol
            }' \n >> `
        );
        this.rl.prompt();
    }
}
