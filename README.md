# shortstop-concat

[Shortstop](https://www.npmjs.com/package/shortstop) handler for concatenating multiple arrays (contained within specified files) into a single array.

```
'use strict';

const shortstop = require('shortstop');
const concatHandler = require('shortstop-concat');

let resolver = shortstop.create();
resolver.use({
    'concat': concatHandler()
));

// The handler expects to receive a glob pattern
let resolved = resolver.resolve({
    'routes': 'concat:./routes/**/*.json'
));

console.log(resolved);
/*
{
    'routes': [
        // ...
    ]
}
*/

};
```

## Passing Base Directory and Additional Resolvers to the Concat Resolver

```
let handlers = require('extra-handlers');

resolver.use({
    'concat': concatHandler('../my-custom-dir', {
        'require': handlers.require(configDir),
        'path': handlers.path(configDir)
    })
});
```

## Related Resources

- [shortstop](https://www.npmjs.com/package/shortstop)