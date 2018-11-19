const divide = (number, boardSize) => {
    const quotient = Math.floor(number / boardSize)
    const remainder = number % boardSize
    return [quotient, remainder]
}

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

    getCoordinateFromNumber(number) {
        const totalNumber = this.boardSize * this.boardSize
        if (number > totalNumber) {
            console.log("woops, invalid number")
            return false
        }
        // normalize number to array index
        const arrayNumber = number - 1
        let [row, col] = divide(arrayNumber, this.boardSize)
        this.markSquare("X", row, col)
    }
}

const newGame = new TicTacToe(3, 3)
// console.log(newGame)
newGame.getCoordinateFromNumber(9)
newGame.getCoordinateFromNumber(10)