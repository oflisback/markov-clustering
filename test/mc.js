const expect = require('chai').expect;
const mc = require('../index.js');
const math = require('mathjs');

describe('Markov clustering tests', () => {
  it('Sums columns of matrix', () => {
    const A = math.matrix([[0, 1], [2, 3], [4, 5]]);
    const colSum = mc.colSum(A);

    expect(colSum).to.deep.equal([6, 9]);
  });

  it('Produces a matrix by repeating a row', () => {
    const repeated = mc.repmat([1, 2, 3], 2);

    expect(repeated).to.deep.equal(math.matrix([[1, 2, 3], [1, 2, 3]]));
  });

  it('Normalizes columns so that all column sums equal 1', () => {
    const A = math.matrix([[0, 2], [1, 0], [3, 8]]);
    const normalized = mc.normalizeColumns(A);
    expect(normalized).to.deep.equal(math.matrix([[0, 0.2], [0.25, 0], [0.75, 0.8]]));
  });

  it('Inflate matrix, element wise power of', () => {
    const A = math.matrix([[0, 2], [1, 4]]);
    const inflated = mc.inflate(A, 2);
    expect(inflated).to.deep.equal(math.matrix([[0, 0.2], [1, 0.8]]));
  });

  it('Expand matrix, matrix power of', () => {
    const A = math.matrix([[0, 2], [1, 4]]);
    const expanded = mc.expand(A, 2);
    expect(expanded).to.deep.equal(math.matrix([[2, 8], [4, 18]]));
  });

  it('Add a diagonal matrix to matrix', () => {
    const A = math.matrix([[0, 2], [1, 4]]);
    const added = mc.addDiagonal(A, 2);
    expect(added).to.deep.equal(math.matrix([[2, 2], [1, 6]]));
  });

  it('Does a row matrix to javascript array conversion', () => {
    const A = math.matrix([[0, 1, 2, 3, 4]]);
    const jsArray = mc.rowMatrixToArray(A);
    expect(jsArray).to.deep.equal([0, 1, 2, 3, 4]);
  });

  it('Perform clustering on hello world style adjacency matrix', () => {
    const A = math.matrix([[0, 1, 1, 0, 0, 0],
                           [1, 0, 1, 0, 0, 0],
                           [1, 1, 0, 1, 0, 0],
                           [0, 0, 1, 0, 1, 1],
                           [0, 0, 0, 1, 0, 1],
                           [0, 0, 0, 1, 1, 0]]);
    const clusters = mc.cluster(A);
    expect(clusters).to.deep.equal([[0, 1, 2], [3, 4, 5]]);
  });

  it('Perform clustering on simple adjacency matrix', () => {
    const A = math.matrix([[0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
                           [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                           [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
                           [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                           [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                           [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                           [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                           [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                           [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                           [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const clusters = mc.cluster(A);
    expect(clusters).to.deep.equal([[1, 5, 9], [2, 6, 7, 8], [0, 3, 4]]);
  });
});
