import { Game } from "../lib/game";
import { Board } from "../lib/board";

describe("Game testsuite", () => {
    const boardSize = 3
    test("initialize with Board", () => {
        const board = new Board(boardSize, 3)
        const game = new Game(board);
        
        expect(game.board).toEqual(board);
        expect(game.board.grid.length).toEqual(boardSize);
    })
    test("#play should warn if input number is invalid", () => {
        console.warn = jest.fn(warn => {
            expect(warn).toEqual("woops, invalid board number")
        })
        const board = new Board(boardSize, 3)
        const game = new Game(board);
        game.play(10, "x")
    })
    describe("Class Game #play test suite", () => {
        let MockedBoard: any;
        let board: any;
        let game: Game;
        beforeEach(() => {
            jest.mock("../lib/board", () => {
                return function () {
                    return {
                        maxGridNumber: jest.fn(() => boardSize * boardSize),
                        convertInputToCoordinates: jest.fn(() => [ 0, 0 ]),
                        markSquare: jest.fn(() => {}),
                        print: jest.fn(() => {})
                    }
                }
            })
            MockedBoard = require("../lib/board");
            board = new MockedBoard();
            game = new Game(board);

            game.play(1, "x");
        })
        afterEach(() => {
            jest.clearAllMocks();
        })
        test("#play should call #board.convertInputToCoordinates", () => {
            expect(board.convertInputToCoordinates).toBeCalledTimes(1)
        })
        test("#play should call #board.maxGridNumber", () => {
            expect(board.maxGridNumber).toBeCalledTimes(1)
        })
        test("#play should call #board.markSquare", () => {
            expect(board.markSquare).toBeCalledTimes(1)
        })
        test("#play should call #board.print", () => {
            expect(board.print).toBeCalledTimes(1)
        })
    })
})