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
        // console.log(this.board)
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
        if (verticalCheck >= this.winCondition) {
            return true
        }
        let horizontalCheck = this.horizontalCheck(symbol, row, col, new Set())
        let forwardDiagonalCheck = this.forwardDiagonalCheck(symbol, row, col, new Set())
        let backwardDiagonalCheck = this.backwardDiagonalCheck(symbol, row, col, new Set())
        console.log("VERTICAL CHECK VALUE: ", verticalCheck)
        console.log("HORIZONTAL CHECK VALUE: ", horizontalCheck)
        console.log("====== END =====")
        return verticalCheck >= this.winCondition || horizontalCheck >= this.winCondition || forwardDiagonalCheck >= this.winCondition || backwardDiagonalCheck >= this.winCondition
    }

    horizontalCheck(symbol, row, col, seen) {
        const self = this;
        const currentPosition = `${row}-${col}`
        seen.add(currentPosition)
        // console.log("BOARD STATUS: ", self.board)
        console.log("SEEN: ", currentPosition)

        if (self.board[row][col] !== symbol) {
            console.log(">> current position is not a symbol")
            return 0
        }
        let returnVal = 1;
        console.log("current row: ", row)
        console.log("current col: ", col)
        const lookForwardNeg = col - 1
        const lookForwardPos = col + 1

        if (lookForwardNeg >= 0 && !seen.has(`${row}-${lookForwardNeg}`)) {
            console.log("Moving 1 col left")
            const check1ColLeft = self.horizontalCheck(symbol, row, col - 1, seen)
            returnVal += check1ColLeft
        }
        if (lookForwardPos >= 0 && !seen.has(`${row}-${lookForwardPos}`)) {
            console.log("Moving 1 col right")
            const check1ColRight = self.horizontalCheck(symbol, row, col + 1, seen)
            returnVal += check1ColRight
        }
        return returnVal
    }

    forwardDiagonalCheck(symbol, row, col, seen) {
        // => /
        const self = this;
        const currentPosition = `${row}-${col}`
        seen.add(currentPosition)
        if (self.board[row][col] !== symbol) {
            return 0
        }
        let returnVal = 1;
        const forwardRow = row - 1
        const forwardCol = col + 1

        const backwardRow = row + 1
        const backwardCol = col - 1
        if (forwardRow >= 0 && forwardCol < self.boardSize && !seen.has(`${forwardRow}-${forwardCol}`)) {
            const diagnoalUp = self.forwardDiagonalCheck(symbol, forwardRow, forwardCol, seen)
            returnVal += diagnoalUp
        }
        if (backwardRow < self.boardSize && backwardCol >= 0 && !seen.has(`${backwardRow}-${backwardCol}`)) {
            const diagonalDown = self.forwardDiagonalCheck(symbol, backwardRow, backwardCol, seen)
            returnVal += diagonalDown
        }
        return returnVal
    }

    backwardDiagonalCheck(symbol, row, col, seen) {
        // => \
        const self = this;
        const currentPosition = `${row}-${col}`
        seen.add(currentPosition)
        if (self.board[row][col] !== symbol) {
            return 0
        }
        let returnVal = 1;
        const forwardRow = row + 1
        const forwardCol = col + 1

        const backwardRow = row - 1
        const backwardCol = col - 1
        if (forwardRow < self.boardSize && forwardCol < self.boardSize && !seen.has(`${forwardRow}-${forwardCol}`)) {
            const diagonalUp = self.backwardDiagonalCheck(symbol, forwardRow, forwardCol, seen)
            returnVal += diagonalUp
        }
        if (backwardRow >= 0 && backwardCol >= 0 && !seen.has(`${backwardRow}-${backwardCol}`)) {
            const diagonalUp = self.backwardDiagonalCheck(symbol, backwardRow, backwardCol, seen)
            returnVal += diagonalUp
        }
        return returnVal
    }

    /**
     * is a recursive function to check it's vertical
     * returns a number
     */
    verticalCheck(symbol, row, col, seen) {
        const self = this;
        const currentPosition = `${row}-${col}`
        seen.add(currentPosition)
        // console.log("BOARD STATUS: ", self.board)
        console.log("SEEN: ", currentPosition)

        // if the current position is not equal to the provided symbol
        // return 0 as count
        if (self.board[row][col] !== symbol) {
            console.log(">> current position is not a symbol")
            return 0
        }
        let returnVal = 1;
        // check if we've "seen" 1 row up, if not we should traverse there to check
        // console.log("current row: ", row)
        // console.log("current col: ", col)
        const lookForwardNeg = row - 1
        const lookForwardPos = row + 1
        // look forward and check if coordinates have been seen
        // if not, traverse to that node and perform another vertical check
        // add 1 to returning value
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
console.log(newGame.board)
// console.log(newGame)
newGame.play(3, "O")
newGame.play(6, "O")
newGame.play(9, "O")