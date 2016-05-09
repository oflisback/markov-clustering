const exports = module.exports = {};
const math = require('mathjs');

exports.colSum = function colSum(A) {
  const nbrRows = A.size()[0];
  const nbrCols = A.size()[1];
  const sum = Array(nbrCols);

  for (let i = 0; i < nbrCols; i++) {
    sum[i] = math.sum(math.subset(A, math.index(math.range(0, nbrRows), i)));
  }

  return sum;
};

// Repeats array row and constructs matrix
exports.repmat = function repmat(row, n) {
  const r = [];
  for (let i = 0; i < n; i++) {
    r.push(row);
  }
  return math.matrix(r);
};

exports.rowMatrixToArray = function rowMatrixToArray(M) {
  const nbrCols = M.size()[1];
  const r = Array(nbrCols);

  for (let i = 0; i < nbrCols; i++) {
    r[i] = M.subset(math.index(0, i));
  }
  return r;
};

exports.normalizeColumns = function normalizeColumns(A) {
  const colSums = this.colSum(A);
  const colSumMatrix = this.repmat(colSums, A.size()[0]);
  const newMatrix = math.dotDivide(A, colSumMatrix);
  return newMatrix;
};

exports.inflate = function inflate(A, factor) {
  return this.normalizeColumns(math.dotPow(A, factor));
};

exports.expand = function expand(A, factor) {
  return math.pow(A, factor);
};

exports.addDiagonal = function addDiagonal(A, value) {
  const diag = math.eye(A.size());
  return math.add(A, math.multiply(value, diag));
};

/* A is a square matrix */
exports.getClusters = function getClusters(A) {
  const clusters = [];
  const n = A.size()[0];

  for (let i = 0; i < n; i++) {
    if (A.subset(math.index(i, i)) > 0.0001) {
      const rowMatrix = A.subset(math.index(i, math.range(0, n)));
      let cluster = this.rowMatrixToArray(rowMatrix).map(
        (x, index) => {return (x > 0.001) ? index : -1;});
      cluster = cluster.filter((x) => x >= 0);
      clusters.push(cluster);
    }
  }
  return clusters;
};

exports.done = function done(M, i) {
  if (i % 10 !== 9) {
    return false;
  }
  const testMatrix = math.dotPow(M, 2);
  const m = math.max(testMatrix) - math.min(testMatrix);
  return (m === 0);
};

// Takes an adjectancy matrix and options
exports.partition = function partition(M, options) {
  const opt = options || {};
  const expandFactor = opt.expandFactor || 2;
  const inflateFactor = opt.inflateFactor || 2;
  const maxLoop = opt.maxLoop || 10;
  const multFactor = opt.multFactor || 1;

  let A = this.addDiagonal(M, multFactor);
  A = this.normalizeColumns(A);

  for (let i = 0; i < maxLoop; i++) {
    A = this.inflate(A, inflateFactor);
    A = this.expand(A, expandFactor);
    if (this.done(A, i)) {
      break;
    }
  }

  return this.getClusters(A);
};
