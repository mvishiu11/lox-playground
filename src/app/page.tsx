"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  Icon,
  chakra
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AiOutlineThunderbolt, AiOutlineControl, AiOutlineCode } from "react-icons/ai";
import { MdMemory } from "react-icons/md";
import Link from "next/link";

export default function HomePage() {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.50, teal.100)",
    "linear(to-r, gray.700, gray.800)"
  );

  return (
    <Box
      as="main"
      minH="100vh"
      px={{ base: 4, md: 16 }}
      py={{ base: 8, md: 16 }}
      bgGradient={bgGradient}
    >
      {/* Hero Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        mb={16}
      >
        {/* Left Side: Intro Text */}
        <Box flex="1" mr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
          <Heading as="h1" size="2xl" mb={4}>
            CoreLox Playground
          </Heading>
          <Text fontSize="lg" mb={4}>
            Experience Lox interpretation “closer to the metal” with{" "}
            <chakra.strong>CoreLox</chakra.strong>—a C-based bytecode interpreter
            inspired by the{" "}
            <ChakraLink
              href="https://craftinginterpreters.com/"
              target="_blank"
              color="blue.500"
              textDecoration="underline"
            >
              <strong>Crafting Interpreters</strong>
            </ChakraLink>{" "}
            book. It lives right here in this
            Playground, letting you run Lox code right in your browser!
          </Text>
          <Text fontSize="md" mb={6}>
            While RustyLox provides memory safety and concurrency, CoreLox
            strips things down to essentials—offering raw speed, minimal overhead,
            and full manual memory management for a hands-on, “closer to the metal”
            feel. Dive into this new way and discover the wonders of Lox.
          </Text>

          <Stack direction="row" gap={4}>
            <Link href="/playground">
              <Button colorScheme="teal" size="md">
                Explore the Playground
              </Button>
            </Link>
            <Link href="/docs">
              <Button colorScheme="teal" size="md">
                See the Docs
              </Button>
            </Link>
            <Link href="https://github.com/mvishiu11/CoreLox" target="_blank">
              <Button
                variant="outline"
                colorScheme="teal"
                size="md"
              >
                GitHub Project
              </Button>
            </Link>
          </Stack>
        </Box>

        {/* Right Side: Hero Image */}
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Image
            src="/images/lox.jpeg"
            alt="Lox Illustration"
            borderRadius="md"
            boxShadow="lg"
          />
        </Box>
      </Flex>

      {/* Features Section */}
      <Box mb={16}>
        <Heading as="h2" size="lg" mb={6}>
          Key Features of CoreLox
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {/* Feature #1 */}
          <Flex
            p={5}
            rounded="md"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            align="center"
            gap={4}
          >
            <Icon as={AiOutlineThunderbolt} boxSize={8} color="teal.500" />
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Bytecode Compilation
              </Heading>
              <Text fontSize="sm">
                Transforms Lox code into bytecode instructions, processed at runtime
                for swift, efficient execution.
              </Text>
            </Box>
          </Flex>

          {/* Feature #2 */}
          <Flex
            p={5}
            rounded="md"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            align="center"
            gap={4}
          >
            <Icon as={MdMemory} boxSize={8} color="teal.500" />
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Manual Memory Management
              </Heading>
              <Text fontSize="sm">
                Unlike RustyLox’s automated safety, CoreLox uses manual allocation
                and resizing for fine-grained performance control.
              </Text>
            </Box>
          </Flex>

          {/* Feature #3 */}
          <Flex
            p={5}
            rounded="md"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            align="center"
            gap={4}
          >
            <Icon as={AiOutlineCode} boxSize={8} color="teal.500" />
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Constants Pool
              </Heading>
              <Text fontSize="sm">
                Literal values and variables kept in a dedicated array for speedy
                lookups during runtime.
              </Text>
            </Box>
          </Flex>

          {/* Feature #4 */}
          <Flex
            p={5}
            rounded="md"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            align="center"
            gap={4}
          >
            <Icon as={AiOutlineControl} boxSize={8} color="teal.500" />
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Streamlined VM
              </Heading>
              <Text fontSize="sm">
                A single-threaded Virtual Machine that handles arithmetic,
                comparisons, and function calls with minimal overhead.
              </Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Box>

      {/* Differences from RustyLox Section */}
      <Box mb={16}>
        <Heading as="h2" size="lg" mb={4}>
          How Does CoreLox Differ from RustyLox?
        </Heading>
        <Text fontSize="md" mb={4}>
          While RustyLox embraces Rust’s error handling and concurrency, CoreLox
          takes a leaner approach, placing memory management in your hands. It&apos;s a
          little riskier but a lot more flexible—and often faster.
        </Text>
        <Text fontSize="md">
          With CoreLox, there’s no garbage collector or built-in concurrency model;
          you decide when and how memory is allocated or freed. Ready to go “closer
          to the metal”? Dive in.
        </Text>
      </Box>

      {/* Additional Info Section */}
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Getting Started
        </Heading>
        <Text fontSize="md" mb={4}>
          Want to compile CoreLox from source? Check out the docs for build steps,
          or head to the Playground for immediate Lox fun. Whether you prefer raw
          speed or memory safety, we&apos;ve got you covered.
        </Text>
        <Text fontSize="md">
          <chakra.span fontWeight="bold">Ready to hack on CoreLox?</chakra.span>{" "}
          Contribute on GitHub, share your improvements, or compare notes with
          RustyLox. Let&apos;s build an even better Lox together!
        </Text>
      </Box>
    </Box>
  );
}
