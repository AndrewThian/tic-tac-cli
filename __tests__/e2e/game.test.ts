import { Game } from "../../lib/game";
import { Board } from "../../lib/board";

describe.only("e2e gameplay test suite", () => {
    beforeEach(() => {
        console.log = jest.fn(() => {})
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    test("horizontal game win condition", () => {
        const board = new Board(3)
        const game = new Game(board);
        const symbols:any = ["x", "o"]
        const gameloop = [1, 4, 2, 7, 3]

        gameloop.map((loop, index) => {
            game.play(loop, symbols[index % 2])
        })
    })
})