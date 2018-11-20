import { IBoard } from "./board";
import { Mark } from "./player";
import { Traverse } from "./traverse";

export interface IGame {
    readonly board: IBoard
    play(inputNumber: number, symbol: Mark): boolean
    checkWin(symbol: Mark, row: number, col: number, winCondition: number): boolean
}

export class Game implements IGame {
    readonly board: IBoard

    constructor (board: IBoard) {
        this.board = board
    }

    play(inputNumber: number, symbol: Mark): boolean {

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
        if (this.checkWin(symbol, row, col, this.board.winCondition)) {
            console.log("win")
            return true
        }
        return false
    }

    checkWin(symbol: Mark, row: number, col: number, winCondition: number): boolean {
        console.log("GOING INTO FIRST CALL")
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
        let [leftRow, leftCol] = Traverse.left(row, col)
        let [rightRow, rightCol] = Traverse.right(row, col)
        // check left
        console.log(seen)
        if (leftCol >= 0 && !seen.has(`${leftRow}-${leftCol}`)) {
            console.log("LEFT")
            const left = self.horizontal(symbol, leftRow, leftCol, seen)
            counter += left;
        }
        // check right
        if (rightCol >= 0 && !seen.has(`${rightRow}-${rightCol}`)) {
            console.log("RIGHT")
            const right = self.horizontal(symbol, rightRow, rightCol, seen)
            counter += right
        }
        return counter
    }
}