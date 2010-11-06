/*
 * Church numerals in JavaScript. Based on the explanation of Church numerals at
 * http://www.billthelizard.com/2010/10/sicp-26-church-numerals.html
 *
 * Open church.htm to run the tests.
 */

// First, just the straightforward definition of churchZero and nextChurch
 
/**
 * The Church numeral for 0
 */
var churchZero = function(f) {
  return function(x) {
    return x;
  };
};

/**
 * Given a Church numeral, returns the next Church numeral.
 */
var nextChurch = function(n) {
  return function(f) {
    return function(x) {
      return f(n(f)(x));
    };
  };
};

// Functions to convert a regular JavaScript number into a Church numeral, and vice versa

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

// Let's create a couple of test functions so we can check our work.

/**
 * Returns true if c is the Church numeral for n
 */ 
function testChurch(c, n) {
  return churchToInt(c) === n;
}

/**
 * Creates a Church numeral for n, then tests to make sure it is in fact the Church
 * numeral for n.
 */
function testRoundTrip(n) {
  return testChurch(intToChurch(n), n);
}

// Now let's try to define the church numerals for one and two directly.

// We won't actually execute this code; this is just to figure out what churchOne should be
if (false) {
  churchOne = nextChurch(churchZero);

  // substitute the value of nextChurch from above
  churchOne = (function(n) {
    return function(f) {
      return function(x) {
        return f(n(f)(x));
      };
    };
  })(churchZero);

  // apply the outermost function, substituting churchZero for n
  churchOne = function(f) {
    return function(x) {
      return f(churchZero(f)(x));
    };
  };

  //substitute the value of churchZero from above.
  churchOne = function(f) {
    return function(x) {
      return f((function(f) {
        return function(x) {
          return x;
        };
      })(f)(x));
    };
  };

  // apply the function we just substituted in, to f
  churchOne = function(f) {
    return function(x) {
      return f((function(x) {
        return x;
      })(x));
    };
  };

  // apply the innermost function to x.
  churchOne = function(f) {
    return function(x) {
      return f(x);
    };
  };
}

// This matches what we expect: churchOne is a function that takes another 
// function (f), and returns a function that applies f to its argument one time.

var churchOne = function(f) {
  return function(x) {
    return f(x);
  };
};

// Now for churchTwo

if (false) {
  churchTwo = nextChurch(churchOne);

  // substitute the expression we just found for churchOne
  churchTwo = nextChurch(function(f) {
    return function(x) {
      return f(x);
    };
  });

  // substitute the value of nextChurch
  churchTwo = (function(n) {
    return function(f) {
      return function(x) {
        return f(n(f)(x));
      };
    };
  })(function(f) {
    return function(x) {
      return f(x);
    };
  });

  // substitute the "function(f)" near the bottom for n
  churchTwo = function(f) {
    return function(x) {
      return f((function(f) {
        return function(x) {
          return f(x);
        };
      })(f)(x));
    };
  };

  // substitute f into the second "function(f)"
  churchTwo = function(f) {
    return function(x) {
      return f((function(x) {
        return f(x);
      })(x));
    };
  };

  // substitute in the x
  churchTwo = function(f) {
    return function(x) {
      return f(f(x));
    };
  };
}

// Again, just as we expect, churchTwo is a function that takes a function f, and
// returns a function that applies f to its argument twice.

var churchTwo = function(f) {
  return function(x) {
    return f(f(x));
  };
};
