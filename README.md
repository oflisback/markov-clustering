## What is this?

This is a Markov graph clustering implementation based on http://micans.org/mcl/.

## Installation

```sh
npm install markov-clustering
```

## Usage

The main entry point is the cluster function. It takes two arguments, an [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix) graph representation and an optional options parameter.

Here's an example options object with default values:

```js
const options = {
  expandFactor: 2,
  inflateFactor: 2,
  maxLoops: 10,
  multFactor: 1;
}
```

## Example

The undirected graph below is used in this example.

![Before clustering](https://cloud.githubusercontent.com/assets/12221141/15180949/c9bd6ca6-1784-11e6-8cb3-72451d25202c.png "Before clustering")

Create an [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix) representation of your graph, this will be the input for the clustering algorithm.

Here's the adjacency matrix for the graph above:

```
[[0, 1, 1, 0, 0, 0],
 [1, 0, 1, 0, 0, 0],
 [1, 1, 0, 1, 0, 0],
 [0, 0, 1, 0, 1, 1],
 [0, 0, 0, 1, 0, 1],
 [0, 0, 0, 1, 1, 0]]
```

The following snippet clusters the adjacency matrix:

```js
const mc = require('markov-clustering');

const A = math.matrix([[0, 1, 1, 0, 0, 0],
                       [1, 0, 1, 0, 0, 0],
                       [1, 1, 0, 1, 0, 0],
                       [0, 0, 1, 0, 1, 1],
                       [0, 0, 0, 1, 0, 1],
                       [0, 0, 0, 1, 1, 0]]);
const clusters = mc.cluster(A);
```

'clusters' now holds an array where each item is a cluster: [[0, 1, 2], [3, 4, 5]].

![After clustering](https://cloud.githubusercontent.com/assets/12221141/15180948/c9ba17f4-1784-11e6-8e33-032bad35a26e.png "After clustering")

## Tests

Some basic tests are included:

```sh
npm run test
```

## Dependencies

The implementation relies on http://mathjs.org/ for matrix implementation.

## License

MIT
