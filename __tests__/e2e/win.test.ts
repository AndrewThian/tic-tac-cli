import { Game } from "../../lib/game";
import { Board } from "../../lib/board";

describe("e2e gameplay win test suite", () => {
    describe("horizontal win conditions", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("game win condition 3x3", () => {
            const board = new Board(3);
            const game = new Game(board);
    
            game.play(1, "x")
            game.play(2, "x")
            expect(game.play(3, "x")).toEqual("win")
        });
        test("game win condition 4x4", () => {
            const board = new Board(4);
            const game = new Game(board);
            
            game.play(5, "x")
            game.play(6, "x")
            expect(game.play(7, "x")).toEqual("win")
        });
        test("game win condition 5x5", () => {
            const board = new Board(5);
            const game = new Game(board);            
            
            game.play(18, "x")
            game.play(19, "x")
            expect(game.play(20, "x")).toEqual("win")
        });
    })
    describe("vertical win conditions", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("game win condition 3x3", () => {
            const board = new Board(3);
            const game = new Game(board);
    
            game.play(3, "x")
            game.play(6, "x")
            expect(game.play(9, "x")).toEqual("win")
        });
        test("game win condition 4x4", () => {
            const board = new Board(4);
            const game = new Game(board);
    
            game.play(7, "x")
            game.play(11, "x")
            expect(game.play(15, "x")).toEqual("win")
        });
        test("game win condition 5x5", () => {
            const board = new Board(5);
            const game = new Game(board);

            game.play(15, "x")
            game.play(20, "x")
            expect(game.play(25, "x")).toEqual("win")
        });
    })
    describe("frontslash win conditions", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("game win condition 3x3", () => {
            const board = new Board(3);
            const game = new Game(board);
    
            game.play(3, "x")
            game.play(5, "x")
            expect(game.play(7, "x")).toEqual("win")
        });
        test("game win condition 4x4", () => {
            const board = new Board(4);
            const game = new Game(board);
    
            game.play(4, "x")
            game.play(7, "x")
            expect(game.play(10, "x")).toEqual("win")
        });
        test("game win condition 5x5", () => {
            const board = new Board(5);
            const game = new Game(board);

            game.play(3, "x")
            game.play(7, "x")
            expect(game.play(11, "x")).toEqual("win")
        });
    })
});
