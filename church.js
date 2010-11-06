/**
 * The Church numeral for 0
 */
var churchZero = function(f) {
  return function(x) {
    return x;
  }
}

/**
 * Given a Church numeral, returns the next Church numeral.
 */
var nextChurch = function(n) {
  return function(f) {
    return function(x) {
      return f(n(f)(x));
    }
  }
}

/**
 * Convert an integer to a church numeral
 */
function intToChurch(n) {
  if (n === 0) return churchZero;
  else return nextChurch(intToChurch(n-1));
}

function increment(x) {
  return x+1;
}

/**
 * Convert a church numeral to an integer
 */
function churchToInt(c) {
  return c(increment)(0);
}

function testChurch(n) {
  var c = intToChurch(n);
  return (churchToInt(c) === n);
}