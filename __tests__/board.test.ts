import { Board } from "../lib/board"

describe("Board testsuite", () => {
    const boardSize = 3
    const numberOfDashes = boardSize * 3 + (boardSize - 1)
    const line = "-----------\n"
    const inputNumber = 10
    test("Should create board on initialization", () => {
        const board = new Board(boardSize, 3)

        expect(board.boardSize).toEqual(boardSize)
        // @ts-ignore
        expect(board.grid).toBeType("array")
    })
    test(`#create Should create a board with ${boardSize} x ${boardSize} grid`, () => {
        const board = new Board(boardSize, 3)

        expect(board.grid.length).toEqual(boardSize)
        
        board.grid.map(row => {
            expect(row.length).toEqual(boardSize)
        })
    })
    test(`#calculateNoOfDashes should return ${numberOfDashes}`, () => {
        const board = new Board(boardSize, 3)

        expect(board.calculateNoOfDashes(boardSize)).toEqual(numberOfDashes)
    })
    test(`#drawBreakLine should return a string of ${numberOfDashes} with a new line`, () => {
        const board = new Board(boardSize, 3)

        expect(board.drawBreakLine(boardSize)).toEqual(line)
    })
    test(`#maxGridNumber should return ${boardSize * boardSize}`, () => {
        const board = new Board(boardSize, 3)
        expect(board.maxGridNumber()).toEqual(boardSize * boardSize)
    })
    test(`#convertInputToCoordinates to return coordinates from inputNumber`, () => {
        const board = new Board(boardSize, 3)
        const arrNo = inputNumber - 1
        const controlRow = Math.floor(arrNo / boardSize)
        const controlCol = arrNo % boardSize
        const [row, col] = board.convertInputToCoordinates(inputNumber)
        expect(row).toEqual(controlRow)
        expect(col).toEqual(controlCol)
    })
    test(`#markSquare should warn if not valid coordinates`, () => {
        const board = new Board(boardSize, 3)
        const badRow = 1000
        const badCol = 1000
        const symbol = "o"

        console.warn = jest.fn(warn => {})
        board.markSquare(symbol, badRow, badCol)
        expect(console.warn).toBeCalledTimes(1)
    })
    test(`#markSquare should mark based on coordinates`, () => {
        const board = new Board(boardSize, 3)
        const row = 1
        const col = 1
        const symbol = "x"

        board.markSquare(symbol, row, col)
        expect(board.grid[row][col]).toEqual(symbol)
    })
    test(`#print should print according to provided template`, () => {
        const board = new Board(boardSize, 3)
        const template = ` 1 | 2 | 3 \n${line} 4 | 5 | 6 \n${line} 7 | 8 | 9 \n`
        console.log = jest.fn(log => {
            // @ts-ignore
            expect(log).toBeType("string")
            expect(log).toEqual(template)
        })

        board.print();
    })
    test(`#valueFromCoordinates should return the value when provided the coordinates`, () => {
        const board = new Board(boardSize, 3)
        const row = 2
        const col = 2
        board.markSquare("x", row, col)
        const value = board.valueFromCoordinates(row, col)

        expect(value).toEqual("x")
    })
})