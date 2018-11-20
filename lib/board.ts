import { Player } from "./player";

export interface IBoard {
    grid: string[][]
    readonly boardSize: number
    winCondition: number

    print(): void;
    create(boardSize: number): string[][]
    drawBreakLine(n: number): string
}

export class Board implements IBoard{
    grid: string[][]
    readonly boardSize: number;
    readonly winCondition: number;

    constructor (boardSize: number, winCondition: number = 3) {
        this.boardSize = boardSize;
        this.winCondition = winCondition;

        this.grid = this.create(this.boardSize);
    }

    create(boardSize: number): string[][] {
        const col = boardSize;
        const row = boardSize;
        let grid: string[][] = [];
        let counter = 1;
        for (let i = 0; i < col; i++) {
            let column: string[] = [];
            grid[i] = column;
            for (let j = 0; j < row; j++) {
                column.push(counter.toString())
                counter++
            }
        }
        return grid
    }

    print(): void {
        const printable = this.grid.reduce((acc, curr: string[]) => {
            const row = ` ${curr.join(" | ")} \n`
            return acc.concat(row)
        }, [])

        const line = this.drawBreakLine(this.boardSize)
        console.log(printable.join(line))
    }

    /**
     * 
     * @param n board size
     */
    drawBreakLine(n: number): string {
        let line: string = "";
        let numberOfDashes = this.calculateNoOfDashes(n)
        for (let i = 0; i < numberOfDashes; i++) {
            line += "-"
        }
        // add breakline
        line += "\n"
        return line
    }

    markSquare(symbol: "x" | "o", row: number, col: number) {
        if (row > this.boardSize || col <= 0) {
            console.warn("woops invalid coordinates")
            return
        }
        this.grid[row][col] = symbol;
    }

    /**
     * 
     * @param n board size
     * calculates the number of dashes need to fill a 3 x 3 grid
     * current implementation incapable of dealing with > 3 grid.
     */
    calculateNoOfDashes(n: number): number {
        return n * 3 + (n - 1)
    }

    maxGridNumber(): number {
        return this.boardSize * this.boardSize;
    }

    convertInputToCoordinates(inputNumber: number): [number, number] {
        // normalize number to array index numerical order
        const arrayNumber = inputNumber - 1
        const row = Math.floor(arrayNumber / this.boardSize)
        const col = arrayNumber % this.boardSize
        return [ row, col ]
    }
}