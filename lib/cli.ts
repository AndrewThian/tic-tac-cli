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
            console.log(
                "\x1b[32m",
                `\nWelcome ${p1.name}, symbol: ${p1.symbol}\n`,
                "\x1b[0m"
            );
            this.rl.question(
                "Enter name of player 2 \n>> ",
                (p2name: string) => {
                    const p2 = new Player(2, p2name);
                    console.log(
                        "\x1b[31m",
                        `\nWelcome ${p2.name}, symbol: ${p2.symbol}\n`,
                        "\x1b[0m"
                    );
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

            board.print();

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

    setWinCondition(game: Game, state: State) {
        this.rl.question(
            "⚠️ You sure you want to do this? Y / N\n",
            (value: string) => {
                if (value.toLocaleLowerCase() === "y") {
                    this.rl.question(
                        "What do you want to set it to?\n>> ",
                        (n: string) => {
                            console.log("⚠️ ... done.\n");
                            game.board.winCondition = parseInt(n);
                            this.questionPlayer(state);
                        }
                    );
                } else {
                    this.questionPlayer(state);
                }
            }
        );
    }

    printBoard(game: Game) {
        game.board.print();
        this.defaultPrompt();
    }

    questionPlayer(state: State) {
        this.rl.setPrompt(
            `${state.currentPlayer().name}, choose a box to place an '${
                state.currentPlayer().symbol
            }' type 'help' for help\n>> `
        );
        this.rl.prompt();
    }

    defaultPrompt() {
        this.rl.setPrompt(this.prefix);
        this.rl.prompt();
    }

    help(commands: string[]) {
        console.log("\x1b[34m", "\nWelcome to helpdesk!\n");
        console.log(`Currently we only support these commands: \n`);
        console.log(`* ${commands[0]} to exit the program`);
        console.log(`* ${commands[1]} to display help`);
        console.log(`* ${commands[2]} to print the board`);
        console.log(`* ${commands[3]} to continue the game!`);
        console.log(`* ${commands[4]} to ⚠️ switch win conditions`);
        console.log(`* ??\n`, "\x1b[0m");
        this.defaultPrompt();
    }

    questionMark() {
        console.log(
            "\x1b[34m",
            `
        MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
        MMMMWX000000000000000000000XWMMWX000000000000000000000XMMMMM
        MMMMXl.....................dWMMNo...................'oKMMMMM
        MMMMWx'...................,OMMMNo..................;kNMMMMMM
        MMMMMNd'.................,xWMMMNo................'dXWMMMMMMM
        MMMMMMNk:...............c0WMMMMNo...............c0WMMMMMMMMM
        MMMMMMMMNkl;........';oONMWNWMMNo.............;kNMMMMMMMMMMM
        MMMMMMMMMMWN0kxdddxOKNWMWKodNMMNo...........'oXWMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMMMMMMMNx;.lNMMNl..........c0WMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMMMMMW0c...lNMMNl........;kNMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMMMWKo'....lNMMNo......'oXWMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMMNx;......lNMMNo.....c0WMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMW0c........lNMMNo...;xNMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMWKo'.........lNMMNo.'oKMMMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMNx;...........lNMMNdcOWMMWXKOkkkO0XWMMMMMMMMMMM
        MMMMMMMMMMMW0c.............lNMMWNNMWKxc,'......,:d0NMMMMMMMM
        MMMMMMMMMWXo'..............lNMMMMWKo,..............cOWMMMMMM
        MMMMMMMMNk;................lNMMMWO;.................'xNMMMMM
        MMMMMMW0c..................lNMMM0;...................'xWMMMM
        MMMMMXd,...................lNMMWd.....................cXMMMM
        MMMMWXOkkkkkkkkkkkkkkkkkkkkKWMMWKkkkkkkkkkkkkkkkkkkkkk0NMMMM
        MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`
        );
        this.defaultPrompt();
    }
}
