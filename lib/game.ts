import { IBoard } from "./board";
import { Mark } from "./player";
import { Traverse } from "./traverse";

type GameStatus = "invalid" | "win" | "next" | "draw";

export interface IGame {
    readonly board: IBoard;
    play(inputNumber: number, symbol: Mark): GameStatus;
    checkWin(
        symbol: Mark,
        row: number,
        col: number,
        winCondition: number
    ): boolean;
}

export class Game implements IGame {
    readonly board: IBoard;

    constructor(board: IBoard) {
        this.board = board;
    }

    play(inputNumber: number, symbol: Mark): GameStatus {
        if (inputNumber > this.board.maxGridNumber()) {
            console.warn("woops, invalid board number");
            return "invalid";
        }
        let [row, col] = this.board.convertInputToCoordinates(inputNumber);
        if (row < 0 || col < 0) {
            return "invalid"
        }
        if (!this.board.markSquare(symbol, row, col)) {
            return "invalid";
        }
        this.board.print();
        if (this.checkWin(symbol, row, col, this.board.winCondition)) {
            return "win";
        }
        return "next";
    }

    checkWin(
        symbol: Mark,
        row: number,
        col: number,
        winCondition: number
    ): boolean {
        let horizontalCheck = this.horizontal(symbol, row, col, new Set());
        return horizontalCheck >= winCondition;
    }

    horizontal(
        symbol: Mark,
        row: number,
        col: number,
        seen: Set<string>
    ): number {
        const currentPosition = `${row}-${col}`;
        seen.add(currentPosition);
        if (this.board.valueFromCoordinates(row, col) !== symbol) {
            return 0;
        }
        let counter = 1;
        let [leftRow, leftCol] = Traverse.left(row, col);
        let [rightRow, rightCol] = Traverse.right(row, col);
        // check left
        if (leftCol >= 0 && !seen.has(`${leftRow}-${leftCol}`)) {
            const left = this.horizontal(symbol, leftRow, leftCol, seen);
            counter += left;
        }
        // check right
        if (rightCol >= 0 && !seen.has(`${rightRow}-${rightCol}`)) {
            const right = this.horizontal(symbol, rightRow, rightCol, seen);
            counter += right;
        }
        return counter;
    }

    // vertical(symbol: Mark, row: number, col: number, seen: Set<string>) {
    //     const this
    // }
}
