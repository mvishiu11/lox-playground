"use client";

import React from "react";
import {
  Box,
  Tabs,
  Heading,
  Text,
  Code,
  List,
  Separator,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import LoxEditor from "@/components/monaco/Editor";


export default function DocsPage() {
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box p={6} maxWidth="1000px" mx="auto">
      <Heading as="h1" size="xl" mb={4} color={headingColor} textAlign="center">
        CoreLox Documentation
      </Heading>

      <Tabs.Root variant="enclosed" colorScheme="blue" fitted defaultValue="intro" alignContent={"center"}>
        <Tabs.List mb="4">
          <Tabs.Trigger value="intro">Intro</Tabs.Trigger>
          <Tabs.Trigger value="tour">Language Tour</Tabs.Trigger>
        </Tabs.List>

          {/* --- TAB 1: INTRO --- */}
          <Tabs.Content value="intro">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                CoreLox Tutorial: Lox Meets C, Head-On
              </Heading>
              <Text mb={4}>
                Welcome to <strong>CoreLox</strong>, your gateway to a minimalist, bytecode-driven
                Lox interpreter written in C. If you’ve ever wanted to see how a language like Lox
                works “closer to the metal,” you’re in the right place.
              </Text>

              <Heading as="h3" size="md" mb={2}>
                1. Why CoreLox?
              </Heading>
              <Text mb={4}>
                In a world where high-level safety nets (like Rust’s) can shield you from the finer
                details of memory management, CoreLox strips everything down to the
                essentials—giving you direct control over every byte. Lox itself is a small, elegant
                language taught in the seminal{" "}
                <ChakraLink
                  href="https://craftinginterpreters.com/"
                  color="teal.500"
                  isExternal
                  textDecoration="underline"
                >
                  <em>Crafting Interpreters</em>
                </ChakraLink>{" "}
                book. By building it in C, we get:
              </Text>
              <List.Root mb={4} pl={4}>
                <List.Item>
                  A <strong>bytecode</strong> approach that compiles Lox scripts before executing
                  them.
                </List.Item>
                <List.Item>
                  Manual memory management for those who want to get their hands dirty with pointers
                  and buffers.
                </List.Item>
                <List.Item>
                  A single-threaded, streamlined VM that focuses on performance and simplicity.
                </List.Item>
              </List.Root>
              <Text mb={4}>
                If RustyLox is the safe, robust older sibling, CoreLox is the thrill-seeking younger
                one, designed for speed and maximum control.
              </Text>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                2. Lox Quick Start
              </Heading>
              <Text mb={4}>
                Lox is a dynamically typed language with a JavaScript-like syntax. A “Hello,
                World!” in CoreLox looks like this:
              </Text>

              <Box mb={4}>
                <Code as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto">
                  print "Hello from CoreLox!";
                </Code>
              </Box>

              <Text mb={4}>
                Under the hood, CoreLox compiles this single statement into <strong>bytecode</strong> and
                hands it to a small but powerful <em>virtual machine</em> that runs your code
                instruction by instruction.
              </Text>

              <Heading as="h4" size="sm" mb={2}>
                2.1 Installing CoreLox
              </Heading>
              <List.Root pl={4} mb={4}>
                <List.Item>
                  <Code>git clone https://github.com/mvishiu11/CoreLox.git</Code>
                  <br />
                  <Code>cd CoreLox</Code>
                </List.Item>
                <List.Item>
                  Build the project: <Code>make</Code>
                </List.Item>
                <List.Item>
                  Run a .lox file: <Code>./corelox path/to/your_file.lox</Code>
                </List.Item>
              </List.Root>
              <Text mb={4}>
                If everything worked, you’ll see the output right in your terminal. For deeper
                internals, compile with debug flags to watch chunk creation, memory usage, etc.
                Details in that are available on the GitHub repo.
              </Text>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                3. Under the Hood: Bytecode &amp; Chunks
              </Heading>
              <Text mb={4}>
                CoreLox compiles your Lox code into a series of <strong>Chunks</strong>. Each chunk
                is an array of instructions (bytecode) representing operations like arithmetic,
                control flow (<Code>if</Code>, <Code>while</Code>), or function calls.
              </Text>

              <Heading as="h4" size="sm" mb={2}>
                3.1 Compilation
              </Heading>
              <Box mb={4}>
                <Code as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto">
                  {
`var x = 3;
print x + 1;`}
                </Code>
              </Box>
              <Text mb={4}>
                The compiler parses that, then emits instructions for:
              </Text>
              <List.Root mb={4} pl={4}>
                <List.Item>Declaring a variable</List.Item>
                <List.Item>Loading the value 3</List.Item>
                <List.Item>Adding 1</List.Item>
                <List.Item>Printing the result</List.Item>
                <List.Item>Resulting bytecode might look like:</List.Item>
              </List.Root>

              
              <Code as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" mb={4}>
                {
`== <script> ==
0000    1 OP_CONSTANT         1 '3'
0002    | OP_DEFINE_GLOBAL    0 'x'
0004    2 OP_GET_GLOBAL       2 'x'
0006    | OP_CONSTANT         3 '1'
0008    | OP_ADD
0009    | OP_PRINT
0010    | OP_NIL
0011    | OP_RETURN`}
              </Code>

              <Heading as="h4" size="sm" mb={2}>
                3.2 Memory Management
              </Heading>
              <Text mb={4}>
                Unlike Rust, where the compiler ensures memory safety automatically, C puts you in
                the driver’s seat. CoreLox uses macros like <Code>GROW_ARRAY</Code> or{" "}
                <Code>FREE_ARRAY</Code> to expand or shrink memory for chunks. Great power, great
                responsibility, etc. ;)
              </Text>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                4. The Virtual Machine
              </Heading>
              <Text mb={4}>
                Once CoreLox has your bytecode, it hands it off to a single-threaded VM. If you want
                concurrency, check out RustyLox—but if raw speed is your jam, CoreLox suffices.
              </Text>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                5. Lox Grammar &amp; Basics
              </Heading>
              <Text mb={2}>
                Here’s a snippet of the grammar. Variables, loops, conditionals, etc.:
              </Text>
              <Box as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" fontSize="sm" mb={4}>
                {
`program      = { declaration }, EOF ;

declaration  = varDecl 
             | funDecl
             | statement ;

funDecl      = "fun", function ;

function     = IDENTIFIER, "(", [ parameters ], ")", block ;

parameters   = IDENTIFIER, { ",", IDENTIFIER } ;

varDecl      = "var", IDENTIFIER, [ "=" expression ], ";" ;

statement    = exprStmt 
             | forStmt
             | ifStmt
             | printStmt 
             | returnStmt
             | whileStmt
             | switchStmt
             | block 
             | breakStmt
             | continueStmt ;

returnStmt   = "return", [ expression ], ";" ;

breakStmt    = "break", ";" ;

continueStmt = "continue", ";" ;

block        = "{", { declaration }, "}" ;

exprStmt     = expression, ";" ;

printStmt    = "print", expression, ";" ;

whileStmt    = "while", "(", expression, ")", statement ;

forStmt      = "for", "(", ( varDecl | exprStmt | ";" ),
                [expression], ";",
                [expression], ")", statement ;

switchStmt   = "switch", "(", expression, ")",
                 "{", { switchCase }, [ defaultCase ], "}" ;

switchCase   = "case", expression, ":", { statement } [ "fall" ];

defaultCase  = "default", ":", { statement } ;

ifStmt       = "if", "(", expression, ")" statement,
               { "elif", "(", expression, ")", statement },
               [ "else", statement ] 
             | "if", expression, "then", statement,
               { "elif", expression, "then", statement },
               [ "else", statement ] ; 

expression   = assignment ;

assignment   = IDENTIFIER, "=", assignment
             | ternary ;

ternary      = logic_or, "?", expression, ":" ternary
             | logic_or ;

logic_or     = logic_and, { "or", logic_and } ;

logic_and    = equality, { "and", equality } ;

equality     = comparison { ( "!=" | "==" ) comparison } ;

comparison   = term { ( ">" | ">=" | "<" | "<=" ) term } ;

term         = factor { ( "-" | "+" ) factor } ;

factor       = unary { ( "/" "*" "%" ) unary } ;

unary        = ( "!" | "-" ) unary
             | call ;

call         = primary, { "(", [ arguments ], ")" } ;

arguments    = expression, { ",", expression } ;

primary      = NUMBER 
             | STRING 
             | "true" 
             | "false" 
             | "nil"
             | "(" expression ")" 
             | IDENTIFIER ;`
}
              </Box>
              <Text mb={4}>
                For full details, see the <em>Language Overview</em> tab or the official source.
              </Text>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                6. Differences from RustyLox
              </Heading>
              <List.Root pl={4} mb={4}>
                <List.Item>Manual memory vs. Rust’s ownership</List.Item>
                <List.Item>Single-threaded vs. concurrency in Rust</List.Item>
                <List.Item>Manual error checks vs. built-in error handling</List.Item>
                <List.Item>Potentially faster compile times</List.Item>
              </List.Root>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                7. Getting Started with CoreLox
              </Heading>
              <List.Root pl={4} mb={4}>
                <List.Item>Have a C compiler (gcc/clang) + make</List.Item>
                <List.Item>Clone &amp; <Code>make</Code></List.Item>
                <List.Item>
                  Write Lox code <Code>print "Hello"</Code>, then run <Code>./corelox</Code>
                </List.Item>
              </List.Root>

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                8. Contributing
              </Heading>
              <Text mb={4}>
                Fork the repo, create a branch, and submit a PR. Tweak memory macros, add new
                opcodes—whatever you like!
              </Text>

              <Heading as="h3" size="md" mb={2}>
                9. Conclusion: Forge Ahead!
              </Heading>
              <Text mb={4}>
                CoreLox brings Lox to the low-level arena. With manual memory and a straightforward
                VM, you can deeply understand how an interpreter works—while still writing user code
                in a clean, dynamic language. Enjoy!
              </Text>
            </Box>
          </Tabs.Content>

          {/* --- TAB 2: LANGUAGE TOUR --- */}
          <Tabs.Content value="tour">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                CoreLox Language Overview
              </Heading>

              <Text mb={4}>
                CoreLox implements a full scope of Lox. Let’s walk through the key
                constructs:
              </Text>

              <Heading as="h3" size="md" mb={2}>
                1. <Code>var</Code>
              </Heading>
              <Text mb={2}>
                Use <Code>var</Code> to declare a variable, optionally with an initializer:
              </Text>
              <Box as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" mb={4}>
                {
`var x = 10;
print x; // 10

var y;
y = 42;
print y; // 42
`}
              </Box>
              <Separator my={4} />

              <Heading as="h3" size="md" mb={2}>
                2. <Code>fun</Code>
              </Heading>
              <Text mb={2}>
                Define a function with <Code>fun</Code>, name, parameters, and a block:
              </Text>
              <Box as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" mb={4}>
                {
`fun greet(name) {
    print "Hello, " + name;
  }

greet("World"); // "Hello, World"
`}
              </Box>
              <Separator my={4} />

              <Heading as="h3" size="md" mb={2}>
                3. <Code>if / elif / else</Code>
              </Heading>
              <Text mb={2}>
                CoreLox uses <Code>elif</Code> for multiple branches:
              </Text>
              <Box as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" mb={4}>
                {`
var x = 15;
if (x < 10) {
  print "x < 10";
} elif (x < 20) {
  print "x < 20";
} else {
  print "x >= 20";
}
                  `}
              </Box>
              <Separator my={4} />

              {/* Repeat for while, for, etc. */}
              <Heading as="h3" size="md" mb={2}>
                4. <Code>while</Code>
              </Heading>
              <Box as="pre" p={3} bg="gray.100" borderRadius="md" overflowX="auto" mb={4}>
                {`var i = 0;
while (i < 3) {
  print i;
  i = i + 1;
}`}
              </Box>

              For more, see examples in {" "}
              <ChakraLink
                  href="/playground"
                  color="teal.500"
                  textDecoration="underline"
              >
                  <em>Playground</em>
                </ChakraLink>{" "}

              <Separator my={6} />

              <Heading as="h3" size="md" mb={2}>
                Summary
              </Heading>
              <Text mb={4}>
                From <Code>var</Code> to <Code>fun</Code>, from <Code>switch</Code> to
                <Code>return</Code>, you’ve got all the building blocks of Lox at your disposal. We
                hope this overview helps you start coding in <strong>CoreLox</strong> quickly!
              </Text>
            </Box>
          </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
