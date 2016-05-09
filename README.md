## What is this?

This is a simple Markov graph clustering implementation based on http://micans.org/mcl/.

## Installation

```sh
npm install markov-clustering
```

## Example

The algorithm entry point, partition, takes an https://en.wikipedia.org/wiki/Adjacency_matrix describing the graph to partition into clusters, and an optional options object.

```js
const mc = require('../index.js');

const A = math.matrix([[0, 1, 1, 0, 0, 0],
                       [1, 0, 1, 0, 0, 0],
                       [1, 1, 0, 1, 0, 0],
                       [0, 0, 1, 0, 1, 1],
                       [0, 0, 0, 1, 0, 1],
                       [0, 0, 0, 1, 1, 0]]);
const clusters = mc.partition(A);
```

clusters will then hold two clusters, [0, 1, 2] and [3, 4, 5].

## Tests

Some basic tests are included:

```sh
npm run tests
```

## License

MIT
