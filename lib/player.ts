export type Mark = "x" | "o"
export type PlayerNumber = 1 | 2

const symbols: Mark[] = [ "x", "o" ] 

export class Player {
    name: string
    readonly playerNumber: PlayerNumber
    readonly symbol: Mark

    constructor (playerNumber: 1 | 2, name: string) {
        this.playerNumber = playerNumber;
        this.name = name
        this.symbol = this.setSymbol(playerNumber)
    }

    private setSymbol(playerNumber: PlayerNumber): Mark {
        return symbols[playerNumber - 1]
    }
}