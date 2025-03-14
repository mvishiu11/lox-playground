export interface CoreloxExample {
    title: string;
    code: string;
    description?: string;
  }
  
export const CORELOX_EXAMPLES: CoreloxExample[] = [
  {
    "title": "Loop Closure",
    "code": "var globalOne;\nvar globalTwo;\n\nfun main() {\n  for (var a = 1; a <= 2; a = a + 1) {\n    fun closure() {\n      print a;\n    }\n    if (globalOne == nil) {\n      globalOne = closure;\n    } else {\n      globalTwo = closure;\n    }\n  }\n}\n\nmain();\nglobalOne();\nglobalTwo();"
  },
  {
    "title": "Fun No Return",
    "code": "fun noReturn() {\n  print \"Do stuff\";\n  // No return here.\n}\n\nprint noReturn();"
  },
  {
    "title": "Hello World",
    "code": "// Try some CoreLox code...\nprint \"Hello, Lox!\";;"
  },
  {
    "title": "Inherit",
    "code": "class Doughnut {\n  cook() {\n    print \"Dunk in the fryer.\";\n  }\n}\n\nclass Cruller < Doughnut {\n  finish() {\n    print \"Glaze with icing.\";\n  }\n}\n\nvar c = Cruller();\nc.cook();\nc.finish();"
  },
  {
    "title": "Closed Upvalues",
    "code": "var globalSet;\nvar globalGet;\n\nfun main() {\n  var a = \"initial\";\n\n  fun set() { a = \"updated\"; }\n  fun get() { print a; }\n\n  globalSet = set;\n  globalGet = get;\n}\n\nmain();\nglobalSet();\nglobalGet();"
  },
  {
    "title": "Hash Table Benchmark",
    "code": "class Zoo {\n  init() {\n    this.aardvark = 1;\n    this.baboon   = 1;\n    this.cat      = 1;\n    this.donkey   = 1;\n    this.elephant = 1;\n    this.fox      = 1;\n  }\n  ant()    { return this.aardvark; }\n  banana() { return this.baboon; }\n  tuna()   { return this.cat; }\n  hay()    { return this.donkey; }\n  grass()  { return this.elephant; }\n  mouse()  { return this.fox; }\n}\n\nvar zoo = Zoo();\nvar sum = 0;\nvar start = clock();\nvar time = clock() - start;\nvar batch = 0;\n\nwhile(time < 10) {\n    while (sum < 10000) {\n        sum = sum + zoo.ant()\n                    + zoo.banana()\n                    + zoo.tuna()\n                    + zoo.hay()\n                    + zoo.grass()\n                    + zoo.mouse();\n    }\n    sum = 0;\n    batch = batch + 1;\n    time = clock() - start;\n}\n\nprint batch;",
    "description": "One of the benchmarks used during development. Warning: slow! Might take a few seconds to run."
  },
  {
    "title": "Lex",
    "code": "fun some() {\n    var a = 3;\n    print a;\n}\n\nsome();"
  },
  {
    "title": "Upvalues",
    "code": "fun outer() {\n  var x = \"outside\";\n  fun inner() {\n    print x;\n  }\n  inner();\n}\nouter();"
  },
  {
    "title": "Break For",
    "code": "for(var a = 8; a > 0; a = a - 1) {\n    if a == 5 then break;\n    print a;\n}"
  },
  {
    "title": "Stack Trace",
    "code": "fun a() { b(); }\nfun b() { c(); }\nfun c() {\n  c(\"too\", \"many\");\n}\n\na();"
  },
  {
    "title": "Cross Scoping",
    "code": "{\n  var a = \"outer\";\n  {\n    var a = a;\n    print a;\n  }\n  print a;\n}"
  },
  {
    "title": "Continue For",
    "code": "var a = 0;\nvar temp;\n\nfor (var b = 1; a < 10000; b = temp + b) {\n  temp = a;\n  a = b;\n  if (a % 2 == 0) {\n    print \"even\";\n    continue;\n  }\n  if a > 5000 then break;\n  print a;\n}\n\nprint \"finished\";\n\n/*\n1\n1\neven\n3\n5\neven\n13\n21\neven\n55\n89\neven\n233\n377\neven\n987\n1597\neven\n4181\nfinished\n*/"
  },
  {
    "title": "While",
    "code": "var a = 3;\nwhile(a > 0) {\n    print a;\n    a = a - 1;\n}\n\nvar b = 3;\nwhile b > 0 then {\n    print b;\n    b = b - 1;\n}"
  },
  {
    "title": "Switch",
    "code": "var x = 3;\n\nswitch (x) {\n    case 1: print \"One\";\n    case 2: print \"Two\";\n    case 3: print \"Three\";\n    default: print \"Default\";\n}"
  },
  {
    "title": "Break",
    "code": "var a = 8;\n\nwhile (a > 0) {\n    if (a == 5) break;\n    print a;\n    a = a - 1;\n}\n\nprint \"while finished\";"
  },
  {
    "title": "Method Calls Benchmark",
    "code": "class Class {\n    init() {\n        this.num_calls = 0;\n    }\n\n    method() {\n        this.num_calls = this.num_calls + 1;\n    }\n}\n\nfun bench() {\n    var c = Class();\n    var start = clock();\n    var time = clock();\n    var batch = 0;\n    while(time - start < 10) {\n        for(var i = 0; i < 10000; i = i + 1)\n        {\n            c.method();\n        }\n        batch = batch + 1;\n        time = clock();\n    }\n    return batch;\n}\n\nprint bench();",
    "description": "One of the benchmarks used during development. Warning: slow! Might take a few seconds to run."
  },
  {
    "title": "Fallthrough Fun",
    "code": "var x = 2;\n\nfun s(x) {\n    switch (x) {\n        case 1:\n            print \"One\";\n        case 2:\n            print \"Two\";\n            fall\n        case 3:\n            print \"Three\";\n        case 4:\n            print \"Four\";\n            fall\n        default:\n            print \"Default\";\n    }\n}\n\ns(x);\n\n/*Should print:\nTwo\nThree\n*/"
  },
  {
    "title": "Class",
    "code": "class Pair {}\n\nvar pair = Pair();\npair.first = 1;\npair.second = 2;\nprint pair.first + pair.second; // 3.\nprint pair.third = 3;           // 3\nprint Pair;                     // class<Pair>\nprint pair;                     // instance<Pair>"
  },
  {
    "title": "For",
    "code": "for(var a = 3; a > 0; a = a - 1) {\n    print a;\n}"
  },
  {
    "title": "If",
    "code": "var a = 3;\nif (a == 3) {\n    print a;\n    a = 2;\n}\n\nif a == 3 then {\n    print a;\n    a = 1;\n}\nelif (a == 2) {\n    print a;\n    a = 5;\n} else {\n    print a;\n    a = 4;\n}\n\nif a == 4 then print \"yeah\";\nelif a == 5 then print \"also yeah\";"
  },
  {
    "title": "Closure",
    "code": "var x = \"global\";\nfun outer() {\n  var x = \"outer\";\n  fun inner() {\n    print x;\n  }\n  inner();\n}\nouter();"
  },
  {
    "title": "Invoke",
    "code": "class Oops {\n  init() {\n    fun f() {\n      print \"not a method\";\n    }\n\n    this.field = f;\n  }\n}\n\nvar oops = Oops();\noops.field();"
  },
  {
    "title": "Ternary",
    "code": "print true ? \"yes\" : \"no\";  // Should print \"yes\"\nprint false ? \"error\" : \"ok\";  // Should print \"ok\"\nprint true ? false ? \"nested true\" : \"nested false\" : \"outer false\";  // Should print \"nested false\"\n\nvar a = 3;\nvar b = 4;\n\nprint a == 3 ? \"a\" : \"error\";  // Should print \"a\"\nprint a >= b ? \"error\" : \"cool\";  // Should print \"cool\"\nprint a + 1 >= b ? \"also cool\" : \"error\";  // Should print \"also cool\""
  },
  {
    "title": "Scoping",
    "code": "{\n    var a = 3;\n    {\n        var a = 1;\n        print a;\n        a = 2;\n        print a;\n        // var a = 8; // <-- If uncommented this should throw an error about two vars with same name in scope\n    }\n    print a;\n}"
  },
  {
    "title": "Method",
    "code": "class Scone {\n  topping(first, second) {\n    print \"scone with \" + first + \" and \" + second;\n  }\n}\n\nvar scone = Scone();\nscone.topping(\"berries\", \"cream\");"
  },
  {
    "title": "Var",
    "code": "var breakfast = \"beignets\";\nprint breakfast;\nvar beverage = \"cafe au lait\";\nbreakfast = \"beignets with \" + beverage;\n\nprint breakfast;"
  },
  {
    "title": "Init",
    "code": "class CoffeeMaker {\n  init(coffee) {\n    this.coffee = coffee;\n  }\n\n  brew() {\n    print \"Enjoy your cup of \" + this.coffee;\n\n    // No reusing the grounds!\n    this.coffee = nil;\n  }\n}\n\nvar maker = CoffeeMaker(\"coffee and chicory\");\nmaker.brew();"
  },
  {
    "title": "Continue",
    "code": "var a = 0;\n\nwhile (a < 10) {\n  a = a + 1;\n  if (a % 2 == 0) {\n    print \"even\";\n    continue;\n  }\n  print a;\n}"
  },
  {
    "title": "Super",
    "code": "class Doughnut {\n  cook() {\n    print \"Dunk in the fryer.\";\n    this.finish(\"sprinkles\");\n  }\n\n  finish(ingredient) {\n    print \"Finish with \" + ingredient;\n  }\n}\n\nclass Cruller < Doughnut {\n  finish(ingredient) {\n    // No sprinkles, always icing.\n    super.finish(\"icing\");\n  }\n}\n\nvar c = Cruller();\nc.cook();"
  },
  {
    "title": "Arithmetic",
    "code": "// Simple arithmetic\nprint 10 + 2 * (3 - 1) % 2;  // 10"
  },
  {
    "title": "Fallthrough",
    "code": "var x = 2;\n\nswitch (x) {\n    case 1:\n        print \"One\";\n    case 2:\n        print \"Two\";\n        fall\n    case 3:\n        print \"Three\";\n    case 4:\n        print \"Four\";\n        fall\n    default:\n        print \"Default\";\n}\n\n/*Should print:\nTwo\nThree\n*/"
  },
  {
    "title": "Fun Return",
    "code": "fun sum(a, b) {\n    return a + b;\n}\n\nprint sum(3, 2); // 5"
  },
  {
    "title": "This Nested",
    "code": "class Nested {\n  method() {\n    fun function() {\n      print this;\n    }\n\n    function();\n  }\n}\n\nNested().method();"
  },
  {
    "title": "Vector Closure",
    "code": "fun Vector(x, y) {\n    var X = x;\n    var Y = y;\n\n    fun setX(x) {\n        X = x;\n    }\n    fun setY(y) {\n        Y = y;\n    }\n\n    fun add(other) {\n        return Vector(X + other(\"getX\"), Y + other(\"getY\"));\n    }\n\n    fun f(op) {\n        switch(op) {\n            case \"getX\":\n                return X;\n            case \"getY\":\n                return Y;\n            case \"setX\":\n                return setX;\n            case \"setY\":\n                return setY;\n            case \"add\":\n                return add;\n            default:\n                return nil;\n        }\n    }\n    return f;\n}\n\nvar v1 = Vector(1, 2);\nvar v2 = Vector(3, 4);\n\nprint v1(\"getX\");\nprint v1(\"getY\");\nprint v2(\"getX\");\nprint v2(\"getY\");\nv1(\"setY\")(8);\nprint v1(\"getY\");\n\nvar v3 = v1(\"add\")(v2);\n\nprint v3(\"getX\");\nprint v3(\"getY\");"
  },
  {
    "title": "Print",
    "code": "print 3 * 4;"
  },
  {
    "title": "And Or",
    "code": "var a = true;\nvar b = false;\n\nprint \"AND: \";\nif(a and b) print \"ab\";\nif(b and a) print \"ba\";\nif(b and b) print \"bb\";\nif(a and a) print \"aa\";\n\nprint \"OR: \";\nif(a or b) print \"ab\";\nif(b or a) print \"ba\";\nif(b or b) print \"bb\";\nif(a or a) print \"aa\";\n\n/* Should print:\nAND: \naa\nOR: \nab\nba\naa\n*/"
  },
  {
    "title": "Fun Decl",
    "code": "fun areWeHavingItYet() {\n  print \"Yes we are!\";\n}\n\nprint areWeHavingItYet;\nareWeHavingItYet();"
  },
  {
    "title": "Fun With Native",
    "code": "fun fib(n) {\n  if (n < 2) return n;\n  return fib(n - 2) + fib(n - 1);\n}\n\nvar start = clock();\nprint fib(35);\nprint clock() - start;"
  }
]
;