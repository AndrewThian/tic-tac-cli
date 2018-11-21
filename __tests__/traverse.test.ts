import { Traverse } from "../lib/traverse";
import { Board } from "../lib/board";

describe("Traverse utilities test suite", () => {
    const grid = new Board(3).grid;
    const col = 1;
    const row = 1;

    beforeAll(() => {
        // control
        expect(grid[col][row]).toEqual("5");
    });

    test("#up should move up on a provided grid", () => {
        const [upRow, upCol] = Traverse.up(row, col);
        expect(grid[upRow][upCol]).toEqual("2");
    });
    test("#down should move down on a provided grid", () => {
        const [downRow, downCol] = Traverse.down(row, col);
        expect(grid[downRow][downCol]).toEqual("8");
    });
    test("#left should move left on a provided grid", () => {
        const [leftRow, leftCol] = Traverse.left(row, col);
        expect(grid[leftRow][leftCol]).toEqual("4");
    });
    test("#right should move right on a provided grid", () => {
        const [rightRow, rightCol] = Traverse.right(row, col);
        expect(grid[rightRow][rightCol]).toEqual("6");
    });
    test("#upRight should move up right", () => {
        const [upRightRow, upRightCol] = Traverse.upRight(row, col);
        expect(grid[upRightRow][upRightCol]).toEqual("3");
    });
    test("#downLeft should move up right", () => {
        const [downLeftRow, downLeftCol] = Traverse.downLeft(row, col);
        expect(grid[downLeftRow][downLeftCol]).toEqual("7");
    });
    test("#upLeft should move up right", () => {
        const [upLeftRow, upLeftCol] = Traverse.upLeft(row, col);
        expect(grid[upLeftRow][upLeftCol]).toEqual("1");
    });
    test("#downRight should move up right", () => {
        const [downRightRow, downRightCol] = Traverse.downRight(row, col);
        expect(grid[downRightRow][downRightCol]).toEqual("9");
    });
});
