## What is this?

This is a simple Markov graph cluster algorithm implementation. For more information about the algorithm, see http://micans.org/mcl/.

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
const math = require('mathjs');

const A = math.matrix([[0, 1, 1, 0, 0, 0],
                       [1, 0, 1, 0, 0, 0],
                       [1, 1, 0, 1, 0, 0],
                       [0, 0, 1, 0, 1, 1],
                       [0, 0, 0, 1, 0, 1],
                       [0, 0, 0, 1, 1, 0]]);
console.log(mc.cluster(A));
```

```sh
$ node snippet.js
[ [ 0, 1, 2 ], [ 3, 4, 5 ] ]
```

![After clustering](https://cloud.githubusercontent.com/assets/12221141/15180948/c9ba17f4-1784-11e6-8e33-032bad35a26e.png "After clustering")

## Tests

Some basic tests are included:

```sh
npm run test
```
## Performance

The computational complexity is not encouraging, the graph below shows execution time for different number of nodes with a fitted third order polynomial. By the way I did not see a significant difference when the graphs were very sparse and represented with sparse mathjs matrices, I didn't look into why, it is not likely that improving the representation would make enough difference for my intended application.

![Computational complexity](https://cloud.githubusercontent.com/assets/12221141/15360596/76b95c06-1d0e-11e6-97ad-a3c5943d0a4c.png "Computational complexity")

## Dependencies

The implementation relies on http://mathjs.org/ for matrix implementation.

## Credits

The implementation is largely based on Python MCL https://github.com/koteth/python_mcl.

## License

MIT
