export interface CoreloxExample {
    title: string;
    code: string;
    description?: string;
  }
  
export const CORELOX_EXAMPLES: CoreloxExample[] = [
    {
      title: "Hello World",
      code: `print "Hello from CoreLox!";`,
      description: "A simple program that prints a greeting."
    },
    {
      title: "Fibonacci",
      code: `
  fun fib(n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
  }
  print fib(10);
  `,
      description: "A basic recursive Fibonacci implementation."
    },
    {
      title: "If / Else",
      code: `
  var x = 5;
  if (x < 10) {
    print "x is less than 10";
  } else {
    print "x is 10 or more";
  }
  `,
      description: "Demonstrates basic conditional logic in Lox."
    },
    {
      title: "While Loop",
      code: `
  var i = 0;
  while (i < 5) {
    print i;
    i = i + 1;
  }
  `,
      description: "Uses a while loop to print numbers 0 through 4."
    },
    {
      title: "For Loop",
      code: `
  for (var i = 0; i < 5; i = i + 1) {
    print i;
  }
  `,
      description: "Demonstrates a for-loop (syntactic sugar).",
    },
    {
      title: "Factorial",
      code: `
  fun factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  print factorial(5);
  `,
      description: "Computes factorial(5) = 120 with recursion.",
    },
];
  