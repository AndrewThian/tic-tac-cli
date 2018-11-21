import { Game } from "../lib/game";
import { Board } from "../lib/board";
import { Traverse } from "../lib/traverse";

const boardSize = 3;

describe("<Game> clas test suite", () => {
    test("initialize with Board", () => {
        const board = new Board(boardSize, 3);
        const game = new Game(board);

        expect(game.board).toEqual(board);
        expect(game.board.grid.length).toEqual(boardSize);
    });
    test("#play should warn if input number is invalid", () => {
        console.warn = jest.fn(warn => {
            expect(warn).toEqual("woops, invalid board number");
        });
        const board = new Board(boardSize, 3);
        const game = new Game(board);
        game.play(10, "x");
    });
    describe("#checkWin", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("#play should execute #checkWin on every call", () => {
            const board = new Board(3);
            const game = new Game(board);
            game.checkWin = jest.fn(() => {});

            game.play(1, "x");
            game.play(2, "x");
            expect(game.checkWin).toBeCalledTimes(2);
        });
        test("should return true if matched win condition", () => {
            const winCondition = 3;
            const board = new Board(3);
            const game = new Game(board);
            // mock horizontal check to win condition
            game.horizontal = jest.fn(() => 3);
            expect(game.checkWin("x", 0, 0, winCondition)).toBeTruthy();
        });
        test("should return false if not win condition", () => {
            const winCondition = 3;
            const board = new Board(3);
            const game = new Game(board);
            // mock horizontal check to win condition
            game.horizontal = jest.fn(() => 2);
            expect(game.checkWin("x", 0, 0, winCondition)).toBeFalsy();
        });
    });
    describe("#vertical" , () => {
        test("should traverse up and down", () => {
            const mockUp = jest.spyOn(Traverse, "up");
            const mockDown = jest.spyOn(Traverse, "down");
            const board = new Board(3)
            board.markSquare("x", 1, 1)
            const game = new Game(board)
            game.vertical("x", 1, 1, new Set())
            
            expect(mockUp).toBeCalled();
            expect(mockDown).toBeCalled();
        })
        describe.only("recursive test cases", () => {
            test("should be called recursively 2x on 1 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "vertical");
                game.play(1, "x")

                expect(mock).toBeCalledTimes(2);
            })
            test("should be called recursively 5x on 2 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "vertical");
                game.play(1, "x")
                game.play(4, "x")

                expect(mock).toBeCalledTimes(5);
            })
            test("should be called recursively 9x on 3 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "vertical");
                game.play(3, "x")
                game.play(6, "x")
                game.play(9, "x")

                expect(mock).toBeCalledTimes(8);
            })
        })
    })
    describe("#horizontal", () => {
        test("should traverse left and right", () => {
            const mockLeft = jest.spyOn(Traverse, "left");
            const mockRight = jest.spyOn(Traverse, "right");
            const board = new Board(3);
            board.markSquare("x", 1, 1);
            const game = new Game(board);

            game.horizontal("x", 1, 1, new Set());
            expect(mockLeft).toBeCalled();
            expect(mockRight).toBeCalled();
        });
        describe("recursive test cases", () => {
            test("should called recursively 2x on 1 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "horizontal");
                game.play(1, "x");

                expect(mock).toBeCalledTimes(2);
            });
            test("should be called recusively 5x on 2 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "horizontal");
                game.play(1, "x");
                game.play(2, "x");

                expect(mock).toBeCalledTimes(5);
            });
            test("should be called recusively 9x on 3 play", () => {
                const board = new Board(boardSize);
                const game = new Game(board);
                const mock = jest.spyOn(game, "horizontal");
                game.play(1, "x");
                game.play(2, "x");
                game.play(3, "x");

                expect(mock).toBeCalledTimes(9);
            });
        });
    });
});

describe("#play Should call <Board> class methods", () => {
    let MockedBoard: any;
    let board: any;
    let game: Game;
    beforeEach(() => {
        jest.mock("../lib/board", () => {
            return function() {
                return {
                    valueFromCoordinates: jest.fn(() => ""),
                    maxGridNumber: jest.fn(() => boardSize * boardSize),
                    convertInputToCoordinates: jest.fn(() => [0, 0]),
                    isCompleted: jest.fn(() => false),
                    markSquare: jest.fn(() => true),
                    print: jest.fn(() => {}),
                };
            };
        });
        MockedBoard = require("../lib/board");
        board = new MockedBoard();
        game = new Game(board);

        game.play(1, "x")
    });
    afterEach(() => {
        jest.unmock("../lib/board")
    });
    test("#play calls #board.convertInputToCoordinates", () => {
        expect(board.convertInputToCoordinates).toBeCalledTimes(1);
    });
    test("#play calls #board.maxGridNumber", () => {
        expect(board.maxGridNumber).toBeCalledTimes(1);
    });
    test("#play calls #board.markSquare", () => {
        expect(board.markSquare).toBeCalledTimes(1);
    });
    test("#play calls #board.print", () => {
        expect(board.print).toBeCalledTimes(1);
    });
    test("#play calls #board.isCompleted", () => {
        expect(board.isCompleted).toBeCalledTimes(1);
    });
});

describe("#play error handling and return values", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test("should return invalid if board does not markSquare", () => {
        const board = new Board(3);
        board.markSquare = jest.fn(() => false)
        const game = new Game(board);

        expect(game.play(1, "x")).toEqual("invalid")
    });
    test("should return draw if board is completed", () => {
        const board = new Board(3);
        board.isCompleted = jest.fn(() => true)
        const game = new Game(board);

        expect(game.play(1, "x")).toEqual("draw")
    })
    test("Scenario 1: invalid' game state from #maxGridNumber", () => {
        const board = new Board(3);
        board.maxGridNumber = jest.fn(() => 9)
        const game = new Game(board);

        expect(game.play(10, "x")).toEqual("invalid")
        console.warn = jest.fn(value => {
            expect(value).toEqual("woops, invalid board number");
        })
    });
    test("Scenario 2: invalid' game state from #convertInputToCoordinates", () => {
        const board = new Board(3);
        board.convertInputToCoordinates = jest.fn(() => [ -1, -1 ])
        const game = new Game(board);

        expect(game.play(10, "x")).toEqual("invalid")
        console.warn = jest.fn(value => {
            expect(value).toEqual("woops, invalid board number");
        })
    })
});