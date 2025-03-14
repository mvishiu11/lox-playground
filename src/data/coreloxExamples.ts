export interface CoreloxExample {
  title: string;
  code: string;
  description?: string;
}

export const CORELOX_EXAMPLES: CoreloxExample[] = [
{
  title: "Hello World",
  code: "// Try some CoreLox code...\nprint \"Hello, Lox!\";",
  description: "A simple program that prints a greeting."
},
{
  title: "Print",
  code: "print 3 * 4;",
  description: "Basic output of an arithmetic expression."
},
{
  title: "Arithmetic",
  code: "// Simple arithmetic\nprint 10 + 2 * (3 - 1) % 2;  // 10",
  description: "Demonstrates arithmetic operations in CoreLox."
},
{
  title: "Var",
  code: "var breakfast = \"beignets\";\nprint breakfast;\nvar beverage = \"cafe au lait\";\nbreakfast = \"beignets with \" + beverage;\n\nprint breakfast;",
  description: "Declaring and reassigning variables."
},
{
  title: "If Statement",
  code: "var a = 3;\nif (a == 3) {\n    print a;\n    a = 2;\n}\n\nif a == 3 then {\n    print a;\n    a = 1;\n}\nelif (a == 2) {\n    print a;\n    a = 5;\n} else {\n    print a;\n    a = 4;\n}\n\nif a == 4 then print \"yeah\";\nelif a == 5 then print \"also yeah\";",
  description: "Demonstrates conditional branching."
},
{
  title: "For Loop",
  code: "for(var a = 3; a > 0; a = a - 1) {\n    print a;\n}",
  description: "Basic for-loop iteration."
},
{
  title: "While Loop",
  code: "var a = 3;\nwhile(a > 0) {\n    print a;\n    a = a - 1;\n}",
  description: "A while-loop decrementing a variable."
},
{
  title: "Function Declaration",
  code: "fun areWeHavingItYet() {\n  print \"Yes we are!\";\n}\n\nprint areWeHavingItYet;\nareWeHavingItYet();",
  description: "Declaring and calling a function."
},
{
  title: "Function Return",
  code: "fun sum(a, b) {\n    return a + b;\n}\n\nprint sum(3, 2); // 5",
  description: "A function that returns a value."
},
{
  title: "Closure",
  code: "var x = \"global\";\nfun outer() {\n  var x = \"outer\";\n  fun inner() {\n    print x;\n  }\n  inner();\n}\nouter();",
  description: "Demonstrates closures capturing variables."
},
{
  title: "Class Definition",
  code: "class Pair {}\n\nvar pair = Pair();\npair.first = 1;\npair.second = 2;\nprint pair.first + pair.second; // 3",
  description: "Defines a class and creates an instance."
},
{
  title: "Inheritance",
  code: "class Doughnut {\n  cook() {\n    print \"Dunk in the fryer.\";\n  }\n}\n\nclass Cruller < Doughnut {\n  finish() {\n    print \"Glaze with icing.\";\n  }\n}\n\nvar c = Cruller();\nc.cook();\nc.finish();",
  description: "Demonstrates class inheritance."
},
{
  title: "Method Invocation",
  code: "class Scone {\n  topping(first, second) {\n    print \"scone with \" + first + \" and \" + second;\n  }\n}\n\nvar scone = Scone();\nscone.topping(\"berries\", \"cream\");",
  description: "Calling methods on an object."
},
{
  title: "Upvalues",
  code: "fun outer() {\n  var x = \"outside\";\n  fun inner() {\n    print x;\n  }\n  inner();\n}\nouter();",
  description: "Capturing a variable from an outer function."
},
{
  title: "Lexical Scope",
  code: "fun some() {\n    var a = 3;\n    print a;\n}\n\nsome();",
  description: "Demonstrating lexical scoping."
},
{
  title: "Break and Continue",
  code: "for(var a = 8; a > 0; a = a - 1) {\n    if a == 5 then break;\n    print a;\n}",
  description: "Using `break` in loops."
},
{
  title: "Switch Statement",
  code: "var x = 3;\n\nswitch (x) {\n    case 1: print \"One\";\n    case 2: print \"Two\";\n    case 3: print \"Three\";\n    default: print \"Default\";\n}",
  description: "Demonstrates a switch-case structure."
},
{
  title: "Loop Closure",
  code: "var globalOne;\nvar globalTwo;\n\nfun main() {\n  for (var a = 1; a <= 2; a = a + 1) {\n    fun closure() {\n      print a;\n    }\n    if (globalOne == nil) {\n      globalOne = closure;\n    } else {\n      globalTwo = closure;\n    }\n  }\n}\n\nmain();\nglobalOne();\nglobalTwo();",
  description: "Closures capturing loop variables."
},
{
  title: "Stack Trace",
  code: "fun a() { b(); }\nfun b() { c(); }\nfun c() {\n  c(\"too\", \"many\");\n}\n\na();",
  description: "Example that causes a recursive stack overflow."
},
{
  title: "Fun With Native",
  code: "fun fib(n) {\n  if (n < 2) return n;\n  return fib(n - 2) + fib(n - 1);\n}\n\nvar start = clock();\nprint fib(35);\nprint clock() - start;",
  description: "A recursive Fibonacci function with timing."
},
{
  title: "Hash Table Benchmark",
  code: "class Zoo {\n  init() {\n    this.aardvark = 1;\n    this.baboon   = 1;\n    this.cat      = 1;\n    this.donkey   = 1;\n    this.elephant = 1;\n    this.fox      = 1;\n  }\n  ant()    { return this.aardvark; }\n  banana() { return this.baboon; }\n  tuna()   { return this.cat; }\n  hay()    { return this.donkey; }\n  grass()  { return this.elephant; }\n  mouse()  { return this.fox; }\n}\n\nvar zoo = Zoo();\nvar sum = 0;\nvar start = clock();\nvar time = clock() - start;\nvar batch = 0;\n\nwhile(time < 10) {\n    while (sum < 10000) {\n        sum = sum + zoo.ant()\n                    + zoo.banana()\n                    + zoo.tuna()\n                    + zoo.hay()\n                    + zoo.grass()\n                    + zoo.mouse();\n    }\n    sum = 0;\n    batch = batch + 1;\n    time = clock() - start;\n}\n\nprint batch;",
  description: "One of the benchmarks used during development. Warning: slow! Might take a few seconds to run."
}
];
