import readline from "readline";
import EventEmitter from "events";
import { Player } from "./player";
import { Board, IBoard } from "./board";

const _event = new EventEmitter();
const rlConfig = { 
    input: process.stdin, 
    output: process.stdout,
    terminal: false
}

const rl = readline.createInterface(rlConfig);
const prefix = ">> "
rl.setPrompt(prefix)

interface GameData {
    p1: Player
    p2: Player
    board: IBoard
}

const setPlayers = () => {
    rl.question("Enter name of player 1 \n>> ", (name: string) => {
        const p1 = new Player(1, name)
        console.log(`P1: ${p1.name}, symbol: ${p1.symbol}`)
        rl.prompt();
        rl.question("Enter name of player 2 \n>> ", (name: string) => {
            const p2 = new Player(2, name)
            console.log(`P1: ${p2.name}, symbol: ${p2.symbol}`)
            rl.prompt();
            rl.question("Enter board size \n>> ", (size: string) => {
                const board = new Board(parseInt(size, 10))
                _event.emit("start", {
                    p1, p2, board
                })
            })
        })
    })
}

type GameplayStatus = "start" | "init" | "turn"

class State {
    playerPool: Player[];
    currentTurn: number
    currentState: GameplayStatus

    constructor (p1: Player, p2: Player, currentTurn: number = 2, currentState: GameplayStatus = "init") {
        this.playerPool = [p1, p2];
        this.currentTurn = currentTurn;
        this.currentState = currentState;
    }

    currentPlayer = (): Player => {
        return this.playerPool[this.currentTurn % 2]
    }
    
    nextTurn = (): void => {
        this.currentTurn += 1
    }

    currentGameStatus = (): GameplayStatus => {
        return this.currentState
    }
}

const questionPlayer = (gameState: State) => {
    rl.setPrompt(`${gameState.currentPlayer().name}, choose a box to place an '${gameState.currentPlayer().symbol}' \n >> `)
    rl.prompt();
}

_event.on("start", ({ p1, p2, board }: GameData) => {
    board.print();

    const gameState = new State(p1, p2);

    // rl.setPrompt(`${gameState.currentPlayer().name}, choose a box to place an '${gameState.currentPlayer().symbol}' \n >> `)
    // rl.prompt();
    questionPlayer(gameState)

    rl.on("line", (value: string) => {
        if (value.match(/^[0-9]+$/)) {
            _event.emit("turn", { gameState, board, value })
        } else if (value === "exit") {
            rl.close();
        }
    }).on("close", () => {
        process.exit(0);
    })
})

interface PlayerTurnData {
    gameState: State
    board: Board
    value: string
}

_event.on("turn", ({ gameState, board, value }: PlayerTurnData) => {
    // mark square on board
    const inputNumber = parseInt(value)
    if (inputNumber > board.maxGridNumber()) {
        console.log("woops, invalid number");
        questionPlayer(gameState);
        return
    }
    const currentPlayer = gameState.currentPlayer()
    const [ row, col ] = board.convertInputToCoordinates(inputNumber)
    board.markSquare(currentPlayer.symbol, row, col)

    // print board
    board.print();
    // check win
    // go next turn

    // board.print();
    // do logic of current user turn
    // then call next turn
    gameState.nextTurn();
    // const currentPlayer = gameState.currentPlayer()
    // rl.setPrompt(`${currentPlayer.name}, choose a box to place an '${currentPlayer.symbol}' \n >> `)
    // rl.prompt();
    questionPlayer(gameState)
})

setPlayers()