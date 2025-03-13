"use client";

import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { Alert, Tabs, Accordion } from "@chakra-ui/react"; // or wherever these come from
import { useState, useEffect, useRef } from "react";
import LoxEditor from "@/components/monaco/Editor";

// Simple example data
const EXAMPLES = [
  {
    title: "Hello World",
    code: `print "Hello from CoreLox!";`,
    description: "A simple program that prints a greeting.",
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
    description: "A basic recursive Fibonacci implementation.",
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
    description: "Demonstrates basic conditional logic in Lox.",
  },
];

// Original split logic for disassembly
function splitOutput(completeOutput: string) {
  const lines = completeOutput.split("\n");
  const bytecodeLines: string[] = [];
  const runtimeLines: string[] = [];

  let inBytecodeSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith("==")) {
      inBytecodeSection = true;
    }
    if (inBytecodeSection && line.trim() === "") {
      inBytecodeSection = false;
      continue;
    }

    if (inBytecodeSection) {
      bytecodeLines.push(line);
    } else {
      runtimeLines.push(line);
    }
  }

  return {
    bytecode: bytecodeLines.join("\n").trim(),
    runtime: runtimeLines.join("\n").trim(),
  };
}

export default function PlaygroundPage() {
  const [code, setCode] = useState('// Try some CoreLox code...\nprint "Hello, Lox!";');
  const [bytecode, setBytecode] = useState("");
  const [runtimeOutput, setRuntimeOutput] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [wasmLoading, setWasmLoading] = useState(true);

  const coreloxRef = useRef<any>(null);

  // Load the Emscripten module (CoreLox) once
  useEffect(() => {
    (async () => {
      try {
        const coreloxModule = await import("@/lib/wasm/corelox.mjs");
        const instance = await coreloxModule.default({
          locateFile: (file) => "/wasm/" + file, // e.g. /wasm/corelox.wasm
        });
        coreloxRef.current = instance;
      } catch (err) {
        console.error("Failed to load WASM module:", err);
      } finally {
        setWasmLoading(false);
      }
    })();
  }, []);

  const runCode = () => {
    if (!coreloxRef.current) {
      setBytecode("");
      setRuntimeOutput("CoreLox WASM not yet loaded...");
      setStatusCode(null);
      return;
    }

    try {
      const retCode = coreloxRef.current.ccall("run_lox", "number", ["string"], [code]);
      setStatusCode(retCode);

      const fullOutput = coreloxRef.current.ccall("get_output", "string", [], []);
      console.log("Full output:", fullOutput);

      // If success (statusCode == 0), do the normal split
      if (retCode === 0) {
        const { bytecode, runtime } = splitOutput(fullOutput);
        setBytecode(bytecode);
        setRuntimeOutput(runtime);
      } else {
        // If non-zero, show entire text in 'Result' tab
        setBytecode("");
        setRuntimeOutput(fullOutput);
      }
    } catch (err: any) {
      setBytecode("");
      setRuntimeOutput(`Runtime error: ${err}`);
      setStatusCode(null);
    }
  };

  // Show a visual cue if statusCode != 0 or if wasm is loading
  let statusBanner = null;
  if (wasmLoading) {
    statusBanner = (
      <Alert.Root status="info" mb={4}>
        <Alert.Indicator />
        <Alert.Title>Loading CoreLox WebAssembly...</Alert.Title>
      </Alert.Root>
    );
  } else if (statusCode !== null) {
    if (statusCode === 0) {
      statusBanner = (
        <Alert.Root status="success" mb={4}>
          <Alert.Indicator />
          <Alert.Title>Execution succeeded (status = 0).</Alert.Title>
        </Alert.Root>
      );
    } else {
      statusBanner = (
        <Alert.Root status="error" mb={4}>
          <Alert.Indicator />
          <Alert.Title>Execution returned error status = {statusCode}.</Alert.Title>
        </Alert.Root>
      );
    }
  }

  // For Examples
  const loadExample = (exampleCode: string) => {
    setCode(exampleCode.trim());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box p={6} maxWidth="1000px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        CoreLox Playground
      </Text>

      {statusBanner}

      <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <LoxEditor value={code} onChange={(value) => value && setCode(value)} />
        <Flex justify="flex-end" mt={2}>
          <Button colorScheme="blue" onClick={runCode} disabled={wasmLoading}>
            Run
          </Button>
        </Flex>
      </Box>

      {/* Output Tabs */}
      <Tabs.Root fitted variant="enclosed" colorScheme="blue" defaultValue={"result"}>
        <Tabs.List mb="1em">
          <Tabs.Trigger value="result">Result</Tabs.Trigger>
          <Tabs.Trigger value="bytecode">Bytecode</Tabs.Trigger>
        </Tabs.List>

        {/* Result */}
        <Tabs.Content value="result">
          <Textarea
            readOnly
            height="200px"
            resize="vertical"
            placeholder="Runtime output will appear here..."
            value={runtimeOutput}
          />
        </Tabs.Content>

        {/* Bytecode */}
        <Tabs.Content value="bytecode">
          <Textarea
            readOnly
            height="200px"
            resize="vertical"
            placeholder="Bytecode disassembly will appear here..."
            value={bytecode}
          />
        </Tabs.Content>

      </Tabs.Root>

      {/* Examples Section (Accordion) */}
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          Examples
        </Text>
        <Accordion.Root collapsible defaultValue={["example-0"]}> 
          {EXAMPLES.map((ex, idx) => (
            <Accordion.Item key={idx} value={`example-${idx}`} mb={2} border="1px solid" borderColor="gray.200">
              <Accordion.ItemTrigger>
                <Flex align="center" justify="space-between" px={4} py={2}>
                  <Text fontWeight="bold">{ex.title}</Text>
                  <Accordion.ItemIndicator />
                </Flex>
              </Accordion.ItemTrigger>

              <Accordion.ItemContent>
                <Accordion.ItemBody px={4} py={2}>
                  {ex.description && (
                    <Text fontSize="sm" mb={2}>
                      {ex.description}
                    </Text>
                  )}
                  <Box
                    as="pre"
                    p={2}
                    bg="gray.100"
                    borderRadius="md"
                    mb={2}
                    fontSize="sm"
                    whiteSpace="pre-wrap"
                  >
                    {ex.code}
                  </Box>
                  <Button size="sm" colorScheme="blue" onClick={() => loadExample(ex.code)}>
                    Load in Editor
                  </Button>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Box>
  );
}
