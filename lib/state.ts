import { Player } from "./player";

export class State {
    playerPool: Player[];
    currentTurn: number;

    constructor(p1: Player, p2: Player, currentTurn: number = 0) {
        this.playerPool = [p1, p2];
        this.currentTurn = currentTurn;
    }

    currentPlayer = (): Player => {
        return this.playerPool[this.currentTurn % 2];
    };

    nextTurn = (): void => {
        this.currentTurn += 1;
    };
}
