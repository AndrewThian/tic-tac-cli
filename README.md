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

Reason behind this is because I'm recreating a new `Set` everytime I call a check a specific line(in this case horizontal)

A better implementation would be to store the `Set` and reuse it for every subsequent horizontal search so as to cache the number of coordinates "`seen`".

Which means, as the greater the winning condition.. the greater my search complexity would be.