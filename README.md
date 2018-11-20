## tsconfig-paths ##

> When providing a baseUrl for `tsconfig.json`, we are only providing a resolution for the compiler.
> But node will never be able to resolve an alias like that unless typescript emits code that rewrites paths.

Reference this github [issue](https://github.com/TypeStrong/ts-node/issues/138)
> That's the node.js error - TypeScript is working fine, but node will never be able to resolve an alias like that unless TypeScript emits code that rewrites paths. What do you think is the solution here?for more explanation.

Thus, someone created a package called `tsconfig-paths` which I've added to the nodemon execution stack and it works perfectly fine now. Have yet to test with production.

## missing types ##

from `expect.extend` in `Jest`