interface ITraverse {
    left(row: number, col: number): [number, number]
    right(row: number, col: number): [number, number]
    up(row: number, col: number): [number, number]
    down(row: number, col: number): [number, number]
    upRight(row: number, col: number): [number, number]
    downLeft(row: number, col: number): [number, number]
    upLeft(row: number, col: number): [number, number]
    downRight(row: number, col: number): [number, number]
}

export const Traverse: ITraverse = {
    left(row, col) {
        return [ row, col - 1 ]
    },
    right(row, col) {
        return [ row, col + 1 ]
    },
    up(row, col) {
        return [ row - 1, col ]
    },
    down(row, col) {
        return [ row + 1, col ]
    },
    upRight(row, col) {
        return this.right(...this.up(row, col))
    },
    downLeft(row, col) {
        return this.left(...this.down(row, col))
    },
    upLeft(row, col) {
        return this.left(...this.up(row, col))
    },
    downRight(row, col) {
        return this.right(...this.down(row, col))
    },
}