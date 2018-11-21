import { Game } from "../../lib/game";
import { Board } from "../../lib/board";

describe("e2e gameplay test suite", () => {
    describe("horizontal win conditions", () => {
        beforeEach(() => {
            console.log = jest.fn(() => {});
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test("horizontal game win condition 3x3", () => {
            const board = new Board(3);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [1, 4, 2, 7, 3];
    
            gameloop.map((loop, index) => {
                if (index === gameloop.length - 1) {
                    expect(game.play(loop, symbols[index % 2])).toEqual("win")
                } else {
                    game.play(loop, symbols[index % 2]);
                }
            });
        });
        test("horizontal game win condition 4x4", () => {
            const board = new Board(4);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [1, 4, 10, 5, 11, 7, 12];
    
            gameloop.map((loop, index) => {
                if (index === gameloop.length - 1) {
                    expect(game.play(loop, symbols[index % 2])).toEqual("win")
                } else {
                    game.play(loop, symbols[index % 2]);
                }
            });
        });
        test("horizontal game win condition 5x5", () => {
            const board = new Board(4);
            const game = new Game(board);
            const symbols: any = ["x", "o"];
            const gameloop = [1, 4, 10, 5, 11, 14, 18, 15, 2, 16];
    
            gameloop.map((loop, index) => {
                if (index === gameloop.length - 1) {
                    expect(game.play(loop, symbols[index % 2])).toEqual("win")
                } else {
                    game.play(loop, symbols[index % 2]);
                }
            });
        });
    })
});
