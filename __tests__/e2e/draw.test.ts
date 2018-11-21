import { Game } from "../../lib/game";
import { Board } from "../../lib/board";

describe("e2e gameplay draw test suite", () => {
    describe("draw conditions", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("game draw condition 3x3", () => {
            const board = new Board(3);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            gameloop.map((loop, index) => {
                game.play(loop, symbols[index % 2]);
            });
        });
        test("game draw condiiton 4x4", () => {
            const boardSize = 4;
            const board = new Board(boardSize);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [];

            for (let i = 1; i <= boardSize * boardSize; i++) {
                gameloop.push(i);
            }

            gameloop.map((loop, index) => {
                game.play(loop, symbols[index % 2]);
            });
        });
        test("game draw condiiton 5x5", () => {
            const boardSize = 5;
            const board = new Board(boardSize);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [];

            for (let i = 1; i <= boardSize * boardSize; i++) {
                gameloop.push(i);
            }

            gameloop.map((loop, index) => {
                game.play(loop, symbols[index % 2]);
            });
        });
    });
});
