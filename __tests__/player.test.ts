import { Player } from "../lib/player"

describe("Player testsuite", () => {
    test("Should create player number", () => {
        const player1 = new Player(1, "andrew")
        const player2 = new Player(2, "sean")

        expect(player1.playerNumber).toEqual(1)
        expect(player2.playerNumber).toEqual(2)
    })
    test("Should create player name", () => {
        const player1 = new Player(1, "andrew")
        const player2 = new Player(2, "sean")

        expect(player1.name).toEqual("andrew")
        expect(player2.name).toEqual("sean")
    })
    test("Should create player symbol", () => {
        const player1 = new Player(1, "andrew")
        const player2 = new Player(2, "sean")

        expect(player1.symbol).toEqual("x")
        expect(player2.symbol).toEqual("o")
    })
})