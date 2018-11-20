import { IBoard } from "./board";
import { Mark } from "./player";

export interface IGame {
    readonly board: IBoard
    play(inputNumber: number, symbol: Mark): void
    checkWin(symbol: Mark, row: number, col: number, winCondition: number): boolean
}

export class Game implements IGame {
    readonly board: IBoard

    constructor (board: IBoard) {
        this.board = board
    }

    play(inputNumber: number, symbol: Mark) {
        if (inputNumber > this.board.maxGridNumber()) {
            console.warn("woops, invalid board number")
            return
        }
        // convert inputNumber to coordinates
        let [ row, col ] = this.board.convertInputToCoordinates(inputNumber);
        // mark square
        this.board.markSquare(symbol, row, col);
        // print board
        this.board.print();
    }

    checkWin(symbol: Mark, row: number, col: number, winCondition: number): boolean {
        let horizontalCheck = this.horizontal(symbol, row, col, new Set())
        return horizontalCheck >= winCondition
    }

    horizontal(symbol: Mark, row: number, col: number, seen: Set<string>): number {
        const self = this;
        const currentPosition = `${row}-${col}`;
        seen.add(currentPosition);
        if (self.board.valueFromCoordinates(row, col) !== symbol) {
            return 0
        }
        let counter = 1
        let [leftRow, leftCol] = this.traverseHorizontal(row, col, "left")
        let [rightRow, rightCol] = this.traverseHorizontal(row, col, "right")

        if (leftCol >= 0 && !seen.has(`${leftRow}-${leftCol}`)) {
            const left = self.horizontal(symbol, leftRow, leftCol, seen)
            counter += left;
        }
        if (rightCol >= 0 && !seen.has(`${rightRow}-${rightCol}`)) {
            const right = self.horizontal(symbol, rightRow, rightCol, seen)
            counter += right
        }
        return counter
    }

    traverseHorizontal(row: number, col: number, direction: "left" | "right"): [number, number] {
        switch(direction) {
            case "left":
                return [row, col - 1]
            case "right":
                return [row, col + 1]
            default:
                console.warn("invalid direction")
                return
        }
    }
}