"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Flex, Button, Text, Textarea } from "@chakra-ui/react";
import { Alert, Tabs, Accordion } from "@chakra-ui/react";

import LoxEditor from "@/components/monaco/Editor";
import { CORELOX_EXAMPLES } from "@/data/coreloxExamples";

interface CoreLoxModule {
  ccall: (
    funcName: string,
    returnType: string,
    argTypes: string[],
    args: unknown[]
  ) => number | string;
  cwrap: (
    funcName: string,
    returnType: string,
    argTypes: string[]
  ) => unknown;
}

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

interface RunHistoryItem {
  timestamp: string;
  elapsedMs: number;
  status: number | null;
}

export default function PlaygroundPage() {
  const [code, setCode] = useState('// Try some CoreLox code...\nprint "Hello, Lox!";');
  const [bytecode, setBytecode] = useState("");
  const [runtimeOutput, setRuntimeOutput] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [wasmLoading, setWasmLoading] = useState(true);

  const [runHistory, setRunHistory] = useState<RunHistoryItem[]>([]);

  const coreloxRef = useRef<CoreLoxModule | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const coreloxModule = await import("@/lib/wasm/corelox.mjs");
        const instance = await coreloxModule.default({
          locateFile: (file: string) => "/wasm/" + file,
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
      // Measure start time
      const start = performance.now();
      const retCode = coreloxRef.current.ccall("run_lox", "number", ["string"], [code]);
      setStatusCode(retCode as number);

      const fullOutput = coreloxRef.current.ccall("get_output", "string", [], []);
      // End time, compute elapsed
      const end = performance.now();
      const elapsed = end - start;

      // If success, split output
      if (retCode === 0) {
        const { bytecode, runtime } = splitOutput(fullOutput as string);
        setBytecode(bytecode);
        setRuntimeOutput(runtime);
      } else {
        // If non-zero, show entire text in 'Result'
        setBytecode("");
        setRuntimeOutput(fullOutput as string);
      }

      // Add to run history
      const nowStr = new Date().toLocaleString();
      setRunHistory((prev) => [
        ...prev,
        {
          timestamp: nowStr,
          elapsedMs: elapsed,
          status: retCode as number,
        },
      ]);
    } catch (err) {
      setBytecode("");
      setRuntimeOutput(`Runtime error: ${err}`);
      setStatusCode(null);
    }
  };

  // Show a little visual cue if statusCode != 0 or if wasm is still loading
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

  // Handle user clicking "Load Example"
  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode.trim());
  };

  return (
    <Flex height="calc(100vh - 80px)" /* or any size you want */ overflow="hidden">
      {/* Left Panel: Examples */}
      <Box
        width="300px"
        borderRight="1px solid"
        borderColor="gray.200"
        overflowY="auto"
        p={4}
      >
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Examples
        </Text>
        <Accordion.Root defaultValue={[`example-0`]}>
          {CORELOX_EXAMPLES.map((ex, idx) => (
            <Accordion.Item
              key={idx}
              value={`example-${idx}`}
              mb={3}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
            >
              <Accordion.ItemTrigger>
                <Flex align="center" justify="space-between" px={3} py={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    {ex.title}
                  </Text>
                  <Accordion.ItemIndicator />
                </Flex>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody px={3} py={2}>
                  {ex.description && (
                    <Text fontSize="xs" mb={2}>
                      {ex.description}
                    </Text>
                  )}
                  <Box
                    as="pre"
                    p={2}
                    bg="gray.100"
                    borderRadius="md"
                    fontSize="xs"
                    whiteSpace="pre-wrap"
                    mb={2}
                  >
                    {ex.code}
                  </Box>
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={() => handleLoadExample(ex.code)}
                  >
                    Load in Editor
                  </Button>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>

      {/* Center: Editor, Output */}
      <Box flex="1" p={4} overflowY="auto">
        <Text fontSize="2xl" textAlign="center" fontWeight="bold" mb={4}>
          CoreLox Playground
        </Text>

        {statusBanner}

        <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
          <LoxEditor
            value={code}
            onChange={(value) => value && setCode(value)}
          />
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

          <Tabs.Content value="bytecode">
            <Textarea
              readOnly
              height="200px"
              resize="vertical"
              placeholder="Bytecode disassembly will appear here..."
              value={bytecode}
            />
          </Tabs.Content>

          <Tabs.Content value="result">
            <Textarea
              readOnly
              height="200px"
              resize="vertical"
              placeholder="Runtime output will appear here..."
              value={runtimeOutput}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      {/* Right Panel: Run History */}
      <Box
        width="250px"
        borderLeft="1px solid"
        borderColor="gray.200"
        overflowY="auto"
        p={4}
      >
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Run History
        </Text>
        {runHistory.map((item, idx) => (
          <Box
            key={idx}
            mb={3}
            p={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            fontSize="sm"
          >
            <Text>Time: {item.timestamp}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Exec: {item.elapsedMs.toFixed(2)} ms</Text>
          </Box>
        ))}
        {runHistory.length === 0 && (
          <Text fontSize="sm" color="gray.500">
            No runs yet.
          </Text>
        )}
      </Box>
    </Flex>
  );
}
