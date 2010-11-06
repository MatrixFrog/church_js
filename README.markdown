So I read [this blog post](http://www.billthelizard.com/2010/10/sicp-26-church-numerals.html) about Church numerals and how they work. As that post says,

> in a language that can manipulate procedures, we can get by without integers altogether

By "a language that can manipulate procedures," he probably meant something like Lisp or Haskell. But I'd been working with JavaScript a lot lately, which is another language in which procedures (or functions) are first class objects. So I thought, why not try and implement Church numerals in JavaScript, just for fun?

And this was the result. Did I learn anything? I guess not, no. But I hope you enjoy it.

For the sake of comparison, here's the Church numeral for zero, in Lisp (from the blog post):

    (define zero (lambda (f) (lambda (x) x)))

and in JavaScript (from this project):

    var churchZero = function(f) {
      return function(x) {
        return x;
      };
    };

Now the Church numeral for one. Lisp:

    (define one
       (lambda (f) (lambda (x) (f x))))

JavaScript:

    var churchOne = function(f) {
      return function(x) {
        return f(x);
      };
    };

Finally, two in Lisp:

    (define two
       (lambda (f) (lambda (x) (f (f x)))))

and in JavaScript:

    var churchTwo = function(f) {
      return function(x) {
        return f(f(x));
      };
    };

Fun, right?