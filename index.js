/**
 * 
 * @param {*} number incoming number to mark square
 * @param {*} boardSize boardSize 
 * algo to retrieve coordinates:
 * (number - 1) / boardSize
 */
class TicTacToe {
    constructor (boardSize, winCondition) {
        this.boardSize = boardSize
        this.winCondition = winCondition
        this.board = this.createBoard(boardSize)
    }

    createBoard (boardSize) {
        const col = boardSize;
        const row = boardSize;
        let grid = [];
        let counter = 1
        for (let i = 0; i < col; i++) {
            let column = []
            grid[i] = column
            for (let j = 0; j < row; j++) {
                column.push(counter)
                counter++
            }
        }
        return grid
    }

    markSquare(mark, row, column) {
        this.board[row][column] = mark;
        console.log(this.board)
    }

    convertInputNoToCoordinates(number) {
        // normalize number to array index numerical order
        const arrayNumber = number - 1
        const row = Math.floor(arrayNumber / this.boardSize)
        const col = arrayNumber % this.boardSize
        return [ row, col ]
    }

    play(number, symbol) {
        const maxBoardNumber = this.boardSize * this.boardSize
        // catch if input number to more than board size
        if (number > maxBoardNumber) {
            console.log("woops, invalid number")
            return
        }
        let [ row, col ] = this.convertInputNoToCoordinates(number)
        this.markSquare(symbol, row, col)
        if (this.checkWin(symbol, row, col)) {
            console.log("WIIIINNNN!!!")
        }
    }

    getValueOfCoordinate(row, col) {
        return this.board[row][col]
    }

    checkWin(symbol, row, col) {
        let verticalCheck = this.verticalCheck(symbol, row, col, new Set()) 
        console.log("VERTICAL CHECK VALUE: ", verticalCheck)
        console.log("====== END =====")
        return verticalCheck >= this.winCondition
    }

    /**
     * is a recursive function to check it's vertical
     * returns a number
     */
    verticalCheck(symbol, row, col, seen) {
        const self = this;
        const currentPosition = `${row}-${col}`
        seen.add(currentPosition)
        console.log("BOARD STATUS: ", self.board)
        console.log("SEEN: ", currentPosition)

        // if the current position is not equal to the provided symbol
        // return 0 as count
        if (self.board[row][col] !== symbol) {
            console.log(">> current position is not a symbol")
            return 0
        }
        let returnVal = 1;
        // check if we've "seen" 1 row up, if not we should traverse there to check
        console.log("current row: ", row)
        console.log("current col: ", col)
        const lookForwardNeg = row - 1
        const lookForwardPos = row + 1
        if (lookForwardNeg >= 0 && !seen.has(`${lookForwardNeg}-${col}`)) {
            console.log(">> Moving 1 row up")
            const check1RowUp = self.verticalCheck(symbol, row - 1, col, seen)
            returnVal += check1RowUp
        }
        if (lookForwardPos < self.boardSize && !seen.has(`${lookForwardPos}-${col}`)) {
            console.log(">> Moving 1 row down")
            const check1RowDown = self.verticalCheck(symbol, row + 1, col, seen)
            returnVal += check1RowDown
        }
        console.log("RETURN VALUE: ", returnVal)
        return returnVal
    }
}

const newGame = new TicTacToe(3, 3)
// console.log(newGame)
newGame.play(3, "X")
newGame.play(7, "X")
newGame.play(3, "X")