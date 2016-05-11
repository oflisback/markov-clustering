'use strict';

var _exports = module.exports = {};
var math = require('mathjs');

_exports.colSum = function colSum(A) {
  var nbrRows = A.size()[0];
  var nbrCols = A.size()[1];
  var sum = Array(nbrCols);

  for (var i = 0; i < nbrCols; i++) {
    sum[i] = math.sum(math.subset(A, math.index(math.range(0, nbrRows), i)));
  }

  return sum;
};

// Repeats array row and constructs matrix
_exports.repmat = function repmat(row, n) {
  var r = [];
  for (var i = 0; i < n; i++) {
    r.push(row);
  }
  return math.matrix(r);
};

_exports.rowMatrixToArray = function rowMatrixToArray(M) {
  var nbrCols = M.size()[1];
  var r = Array(nbrCols);

  for (var i = 0; i < nbrCols; i++) {
    r[i] = M.subset(math.index(0, i));
  }
  return r;
};

_exports.normalizeColumns = function normalizeColumns(A) {
  var colSums = this.colSum(A);
  var colSumMatrix = this.repmat(colSums, A.size()[0]);
  var newMatrix = math.dotDivide(A, colSumMatrix);
  return newMatrix;
};

_exports.inflate = function inflate(A, factor) {
  return this.normalizeColumns(math.dotPow(A, factor));
};

_exports.expand = function expand(A, factor) {
  return math.pow(A, factor);
};

_exports.addDiagonal = function addDiagonal(A, value) {
  var diag = math.eye(A.size());
  return math.add(A, math.multiply(value, diag));
};

/* A is a square matrix */
_exports.getClusters = function getClusters(A) {
  var clusters = [];
  var n = A.size()[0];

  for (var i = 0; i < n; i++) {
    if (A.subset(math.index(i, i)) > 0.0001) {
      var rowMatrix = A.subset(math.index(i, math.range(0, n)));
      var cluster = this.rowMatrixToArray(rowMatrix).map(function (x, index) {
        return x > 0.001 ? index : -1;
      });
      cluster = cluster.filter(function (x) {
        return x >= 0;
      });
      clusters.push(cluster);
    }
  }
  return clusters;
};

_exports.done = function done(M, i) {
  var testMatrix = math.dotPow(M, 2);
  var m = math.max(testMatrix) - math.min(testMatrix);
  return m === 0;
};

// Takes an adjectancy matrix and options
_exports.cluster = function cluster(M, options) {
  var opt = options || {};
  var expandFactor = opt.expandFactor || 2;
  var inflateFactor = opt.inflateFactor || 2;
  var maxLoops = opt.maxLoops || 10;
  var multFactor = opt.multFactor || 1;

  var A = this.addDiagonal(M, multFactor);
  A = this.normalizeColumns(A);

  for (var i = 0; i < maxLoops; i++) {
    A = this.inflate(A, inflateFactor);
    A = this.expand(A, expandFactor);
    if (this.done(A, i)) {
      break;
    }
  }

  return this.getClusters(A);
};
