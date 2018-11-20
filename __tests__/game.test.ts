import { Game } from "../lib/game";
import { Board } from "../lib/board";
import { Traverse } from "../lib/traverse"

describe("<Game> clas test suite", () => {
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
    describe("#checkWin", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {})
        })
        afterEach(() => {
            jest.clearAllMocks();
        })
        test("#play should execute #checkWin on every call", () => {
            const board = new Board(3)
            const game = new Game(board)
            game.checkWin = jest.fn(() => {})

            game.play(1, "x")
            game.play(2, "x")
            expect(game.checkWin).toBeCalledTimes(2);
        })
        test("should return true if matched win condition", () => {
            const winCondition = 3
            const board = new Board(3)
            const game = new Game(board)
            // mock horizontal check to win condition
            game.horizontal = jest.fn(() => 3)
            expect(game.checkWin("x", 0, 0, winCondition)).toBeTruthy()
        })
        test("should return false if not win condition", () => {
            const winCondition = 3
            const board = new Board(3)
            const game = new Game(board)
            // mock horizontal check to win condition
            game.horizontal = jest.fn(() => 2)
            expect(game.checkWin("x", 0, 0, winCondition)).toBeFalsy()
        })
    })
    describe("#horizontal", () => {
        test("should traverse left and right", () => {
            const mockLeft = jest.spyOn(Traverse, "left")
            const mockRight = jest.spyOn(Traverse, "right")
            const board = new Board(3)
            board.markSquare("x", 1, 1)
            const game = new Game(board)

            game.horizontal("x", 1, 1, new Set());
            expect(mockLeft).toBeCalled();
            expect(mockRight).toBeCalled();
        })
        describe("recursive test cases", () => {
            test("should called recursively 2x on 1 play", () => {
                const board = new Board(boardSize)
                const game = new Game(board)
                const mock = jest.spyOn(game, "horizontal")
                game.play(1, "x")
    
                expect(mock).toBeCalledTimes(2)
            })
            test("should be called recusively 5x on 2 play", () => {
                const board = new Board(boardSize)
                const game = new Game(board)
                const mock = jest.spyOn(game, "horizontal")
                game.play(1, "x")
                game.play(2, "x")

                expect(mock).toBeCalledTimes(5)
            })
            test("should be called recusively 9x on 3 play", () => {
                const board = new Board(boardSize)
                const game = new Game(board)
                const mock = jest.spyOn(game, "horizontal")
                game.play(1, "x")
                game.play(2, "x")
                game.play(3, "x")

                expect(mock).toBeCalledTimes(9)
            })
        })
    })
    describe("#play test scope", () => {
        describe("Should call <Board> class methods", () => {
            let MockedBoard: any;
            let board: any;
            let game: Game;
            beforeEach(() => {
                jest.mock("../lib/board", () => {
                    return function () {
                        return {
                            valueFromCoordinates: jest.fn(() => ""),
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
})