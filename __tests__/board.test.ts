import { Board } from "../lib/board";

describe("Board testsuite", () => {
    const boardSize = 3;
    const numberOfDashes = boardSize * 3 + (boardSize - 1);
    const line = "-----------\n";
    test("Should create board on initialization", () => {
        const board = new Board(boardSize, 3);

        expect(board.boardSize).toEqual(boardSize);
        // @ts-ignore
        expect(board.grid).toBeType("array");
    });
    test(`#create Should create a board with ${boardSize} x ${boardSize} grid`, () => {
        const board = new Board(boardSize, 3);

        expect(board.grid.length).toEqual(boardSize);

        board.grid.map(row => {
            expect(row.length).toEqual(boardSize);
        });
    });
    test(`#calculateNoOfDashes should return ${numberOfDashes}`, () => {
        const board = new Board(boardSize, 3);

        expect(board.calculateNoOfDashes(boardSize)).toEqual(numberOfDashes);
    });
    test(`#drawBreakLine should return a string of ${numberOfDashes} with a new line`, () => {
        const board = new Board(boardSize, 3);

        expect(board.drawBreakLine(boardSize)).toEqual(line);
    });
    test(`#maxGridNumber should return ${boardSize * boardSize}`, () => {
        const board = new Board(boardSize, 3);
        expect(board.maxGridNumber()).toEqual(boardSize * boardSize);
    });
    test(`#convertInputToCoordinates to return coordinates from inputNumber`, () => {
        const inputNumber = 9;
        const board = new Board(boardSize, 3);
        const arrNo = inputNumber - 1;
        const controlRow = Math.floor(arrNo / boardSize);
        const controlCol = arrNo % boardSize;
        const [row, col] = board.convertInputToCoordinates(inputNumber);
        expect(row).toEqual(controlRow);
        expect(col).toEqual(controlCol);
    });
    test(`#convertInputToCoordinates to warn and return negative coordinates if invalid`, () => {
        const invalidInputNumber = 1000;
        const board = new Board(boardSize, 3);
        const [row, col] = board.convertInputToCoordinates(invalidInputNumber);
        expect(row).toEqual(-1);
        expect(col).toEqual(-1);
    });
    describe("#markSquare test scope", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        test(`should warn if not valid coordinates and return false`, () => {
            const board = new Board(boardSize, 3);
            const badRow = 1000;
            const badCol = 1000;
            const symbol = "o";
            console.warn = jest.fn(warn => {});

            expect(board.markSquare(symbol, badRow, badCol)).toEqual(false);
            expect(console.warn).toBeCalledTimes(1);
        });
        test(`should warn if coordinates already has a "o" and return false`, () => {
            const board = new Board(boardSize);
            const row = 1;
            const col = 1;
            const symbol = "x";
            board.markSquare(symbol, row, col);
            console.warn = jest.fn(warn => {});

            expect(board.markSquare(symbol, row, col)).toEqual(false);
            expect(console.warn).toBeCalledTimes(1);
        });
        test(`should warn if coordinates already has a "x" and return false`, () => {
            const board = new Board(boardSize);
            const row = 2;
            const col = 2;
            const symbol = "o";
            board.markSquare(symbol, row, col);
            console.warn = jest.fn(warn => {});

            expect(board.markSquare(symbol, row, col)).toEqual(false);
            expect(console.warn).toBeCalledTimes(1);
        });
        test(`should mark based on coordinates and return true`, () => {
            const board = new Board(boardSize, 3);
            const row = 1;
            const col = 1;
            const symbol = "x";

            expect(board.markSquare(symbol, row, col)).toEqual(true);
            expect(board.grid[row][col]).toEqual(symbol);
        });
        test("should add to count", () => {
            const board = new Board(boardSize, 3);
            const row = 1;
            const col = 1;
            const symbol = "x";

            board.markSquare(symbol, row, col);
            board.markSquare(symbol, row - 1, col);

            expect(board.count).toEqual(2);
        });
    });
    test(`#print should print according to provided template`, () => {
        const board = new Board(boardSize, 3);
        console.log = jest.fn(log => {
            // @ts-ignore
            expect(log).toBeType("string");
        });

        board.print();
    });
    test(`#valueFromCoordinates should return the value when provided the coordinates`, () => {
        const board = new Board(boardSize, 3);
        const row = 2;
        const col = 2;
        board.markSquare("x", row, col);
        const value = board.valueFromCoordinates(row, col);

        expect(value).toEqual("x");
    });
    test("#isCompleted should return true if board completed", () => {
        const board = new Board(boardSize, 3);
        const symbol = "x";
        // first row
        board.markSquare(symbol, 0, 0);
        board.markSquare(symbol, 0, 1);
        board.markSquare(symbol, 0, 2);
        // second row
        board.markSquare(symbol, 1, 0);
        board.markSquare(symbol, 1, 1);
        board.markSquare(symbol, 1, 2);
        // third row
        board.markSquare(symbol, 2, 0);
        board.markSquare(symbol, 2, 1);
        board.markSquare(symbol, 2, 2);

        expect(board.isCompleted()).toEqual(true);
    });
});
