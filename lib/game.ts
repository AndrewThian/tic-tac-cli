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
            return "invalid";
        }
        if (!this.board.markSquare(symbol, row, col)) {
            return "invalid";
        }
        this.board.print();
        if (this.board.isCompleted()) {
            return "draw";
        }
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
        let verticalCheck = this.vertical(symbol, row, col, new Set());
        let frontSlashCheck = this.diagonalFront(symbol, row, col, new Set());
        let backSlashCheck = this.diagonalBack(symbol, row, col, new Set());
        return (
            horizontalCheck >= winCondition ||
            verticalCheck >= winCondition ||
            frontSlashCheck >= winCondition ||
            backSlashCheck >= winCondition
        );
    }

    horizontal(symbol: Mark, row: number, col: number, seen: Set<string>): number {
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

    vertical(symbol: Mark, row: number, col: number, seen: Set<string>) {
        const currentPosition = `${row}-${col}`;
        seen.add(currentPosition);
        if (this.board.valueFromCoordinates(row, col) !== symbol) {
            return 0;
        }
        let counter = 1;
        let [upRow, upCol] = Traverse.up(row, col);
        let [downRow, downCol] = Traverse.down(row, col);
        // check up
        if (upRow >= 0 && !seen.has(`${upRow}-${upCol}`)) {
            const up = this.vertical(symbol, upRow, upCol, seen);
            counter += up;
        }
        // check down
        if (
            downRow < this.board.boardSize &&
            !seen.has(`${downRow}-${downCol}`)
        ) {
            const down = this.vertical(symbol, downRow, downCol, seen);
            counter += down;
        }
        return counter;
    }

    diagonalFront(symbol: Mark, row: number, col: number, seen: Set<string>) {
        const currentPosition = `${row}-${col}`;
        seen.add(currentPosition);
        if (this.board.valueFromCoordinates(row, col) !== symbol) {
            return 0;
        }
        let counter = 1;
        let [upRightRow, upRightCol] = Traverse.upRight(row, col);
        let [downLeftRow, downLeftCol] = Traverse.downLeft(row, col);
        // check upRight
        if (
            upRightRow >= 0 &&
            upRightCol < this.board.boardSize &&
            !seen.has(`${upRightRow}-${upRightCol}`)
        ) {
            const upRight = this.diagonalFront(
                symbol,
                upRightRow,
                upRightCol,
                seen
            );
            counter += upRight;
        }
        // check downLeft
        if (
            downLeftRow < this.board.boardSize &&
            downLeftCol >= 0 &&
            !seen.has(`${downLeftRow}-${downLeftCol}`)
        ) {
            const downLeft = this.diagonalFront(
                symbol,
                downLeftRow,
                downLeftCol,
                seen
            );
            counter += downLeft;
        }
        return counter;
    }

    diagonalBack(symbol: Mark, row: number, col: number, seen: Set<string>) {
        const currentPosition = `${row}-${col}`;
        seen.add(currentPosition);
        if (this.board.valueFromCoordinates(row, col) !== symbol) {
            return 0;
        }
        let counter = 1;
        let [upLeftRow, upLeftCol] = Traverse.upLeft(row, col);
        let [downRightRow, downRightCol] = Traverse.downRight(row, col);
        // check upLeft
        if (
            upLeftRow >= 0 &&
            upLeftCol >= 0 &&
            !seen.has(`${upLeftRow}-${upLeftCol}`)
        ) {
            const upLeft = this.diagonalBack(
                symbol,
                upLeftRow,
                upLeftCol,
                seen
            );
            counter += upLeft;
        }
        // check downRight
        if (
            downRightRow < this.board.boardSize &&
            downRightCol < this.board.boardSize &&
            !seen.has(`${downRightRow}-${downRightCol}`)
        ) {
            const downRight = this.diagonalBack(
                symbol,
                downRightRow,
                downRightCol,
                seen
            );
            counter += downRight;
        }
        return counter;
    }
}
