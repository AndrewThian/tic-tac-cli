import readline from "readline";
import EventEmitter from "events";
import { Player } from "./player";
import { Board, IBoard } from "./board";
import { Game } from "./game";

const _event = new EventEmitter();
const rlConfig = {
    input: process.stdin,
    output: process.stdout,
    terminal: false,
};

const rl = readline.createInterface(rlConfig);
const prefix = ">> ";
rl.setPrompt(prefix);

interface GameData {
    p1: Player;
    p2: Player;
    board: IBoard;
    game: Game;
}

const setPlayers = () => {
    rl.question("Enter name of player 1 \n>> ", (name: string) => {
        const p1 = new Player(1, name);
        console.log(`P1: ${p1.name}, symbol: ${p1.symbol}`);
        rl.prompt();
        rl.question("Enter name of player 2 \n>> ", (name: string) => {
            const p2 = new Player(2, name);
            console.log(`P1: ${p2.name}, symbol: ${p2.symbol}`);
            rl.prompt();
            rl.question("Enter board size \n>> ", (size: string) => {
                const board = new Board(parseInt(size, 10));
                const game = new Game(board);
                _event.emit("start", {
                    p1,
                    p2,
                    board,
                    game,
                });
            });
        });
    });
};

type GameplayStatus = "start" | "init" | "turn";

class State {
    playerPool: Player[];
    currentTurn: number;
    currentState: GameplayStatus;

    constructor(
        p1: Player,
        p2: Player,
        currentTurn: number = 2,
        currentState: GameplayStatus = "init"
    ) {
        this.playerPool = [p1, p2];
        this.currentTurn = currentTurn;
        this.currentState = currentState;
    }

    currentPlayer = (): Player => {
        return this.playerPool[this.currentTurn % 2];
    };

    nextTurn = (): void => {
        this.currentTurn += 1;
    };

    currentGameStatus = (): GameplayStatus => {
        return this.currentState;
    };
}

const questionPlayer = (gameState: State) => {
    rl.setPrompt(
        `${gameState.currentPlayer().name}, choose a box to place an '${
            gameState.currentPlayer().symbol
        }' \n >> `
    );
    rl.prompt();
};

_event.on("start", ({ p1, p2, game, board }: GameData) => {
    board.print();

    const gameState = new State(p1, p2);
    questionPlayer(gameState);

    rl.on("line", (value: string) => {
        if (value.match(/^[0-9]+$/)) {
            _event.emit("turn", { gameState, board, game, value });
        } else if (value === "exit") {
            rl.close();
        }
    }).on("close", () => {
        process.exit(0);
    });
});

interface PlayerTurnData {
    gameState: State;
    board: Board;
    game: Game;
    value: string;
}

_event.on("turn", ({ gameState, game, value }: PlayerTurnData) => {
    const inputNumber = parseInt(value);
    const currentPlayer = gameState.currentPlayer();
    switch (game.play(inputNumber, currentPlayer.symbol)) {
        case "next": {
            gameState.nextTurn();
            questionPlayer(gameState);
            break;
        }
        case "invalid": {
            questionPlayer(gameState);
            break;
        }
        case "win": {
            rl.close();
            break;
        }
    }
});

setPlayers();
