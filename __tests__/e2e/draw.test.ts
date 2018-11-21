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
            const gameloop = [1, 2, 3, 4, 5, 6, 8, 7, 9];

            board.print();

            gameloop.map((loop, index) => {
                if (index === gameloop.length - 1) {
                    expect(game.play(loop, symbols[index % 2])).toEqual("draw")
                } else {
                    game.play(loop, symbols[index % 2]);
                }
            });
        });
    });
});
