## Intro ##

Welcome to tic-tac-cli, it's an over-engineered solution to command line tic tac toe. Instead of hardcoding the win conditions,
I decided to implement sort of a recursive pattern to traverse the 2D array and check conditions based on the direction. Which means, not matter how large the board is, as long as you connect 3, you'll win. Yes I know, if you start first you'll always win. But who cares. I do, I care.

## Usage ##

1. `$ npm start`
2. profit???

1. `$ npm test`
2. coverage???

## packages / dependencies ##

1. `typescript`: for type-checking
2. `husky`: git-hook management (pre-commit linting and pre-push run tests)
3. `jest` / `ts-jest`: testing and assertions
4. `nodemon`: dev-tools
5. `prettier`: code formatting

## directory structure ##

```
.
├── README.md
├── __tests__ // test suite
│   ├── board.test.ts
│   ├── e2e
│   │   ├── draw.test.ts
│   │   └── win.test.ts
│   ├── game.test.ts
│   ├── player.test.ts
│   └── traverse.test.ts
├── jest.config.js 
├── lib // main directory
│   ├── board.ts // class Board {} -> incharged of any domain regarding the tic-tac board
│   ├── cli.ts // class CLI {} -> handles all user input from command line and intergrates with other classes
│   ├── game.ts // class Game {} -> a "wrapper" over board to provide win condition checks
│   ├── index.ts // entry point
│   ├── player.ts // class Player {} -> holds the player's data
│   ├── state.ts // class State {} -> manages the game state and which player is currently playing
│   └── traverse.ts // module Traverse -> handles all logic for traversal direction
├── package-lock.json
├── package.json
├── prototype.js
├── setupTests.js // setting up jest tests for extending assertion library
└── tsconfig.json
```

## tsconfig-paths ##

> When providing a baseUrl for `tsconfig.json`, we are only providing a resolution for the compiler.
> But node will never be able to resolve an alias like that unless typescript emits code that rewrites paths.

Reference this github [issue](https://github.com/TypeStrong/ts-node/issues/138)
> That's the node.js error - TypeScript is working fine, but node will never be able to resolve an alias like that unless TypeScript emits code that rewrites paths. What do you think is the solution here?for more explanation.

Thus, someone created a package called `tsconfig-paths` which I've added to the nodemon execution stack and it works perfectly fine now. Have yet to test with production.

## missing types ##

from `expect.extend` in `Jest`

## recursive search pattern ##

The current implementation of my recursive traversal search pattern for determining the number of win conditions is greedy. 

For example: horizontal search would search
> first search: init + right (2 searches)
> second search: init + left + right (3 searches)
> last search: init + left + left + right (4 searches)

total searches: 9 in total

In effect, the pattern doesn't remember any previous calls of `#checkWin` and will iterate over the provided win conditions anyway.
Reason behind this is because I'm recreating a new `Set` everytime I call a check a specific line(in this case horizontal)

A better implementation would be to store the `Set` and reuse it for every subsequent horizontal search so as to cache the number of coordinates "`seen`".

Which means, as the greater the winning condition.. the greater my search complexity would be.