export const EXAMPLES = [
    {
      title: "Hello World",
      code: `print "Hello, Lox!";`
    },
    {
      title: "Fibonacci",
      code: `
  fun fib(n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
  }
  print fib(10);
  `
    },
    {
      title: "If/Else Example",
      code: `
  var a = 10;
  if (a > 5) {
    print "a is greater than 5";
  } else {
    print "a is 5 or less";
  }
  `
    }
  ];
  