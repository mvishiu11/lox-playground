"use client";

import Link from "next/link";
import { Box, Flex, HStack, Button, IconButton } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <Box
      as="nav"
      bg="gray.900"
      color="white"
      px={4}
      py={3}
      mb={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center">
        {/* This Box takes up all horizontal space and centers the links */}
        <Box flex="1" display="flex" justifyContent="center">
          <HStack gap={8}>
            <Link href="/">
              <Button variant="solid" colorScheme="whiteAlpha">
                Home
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="solid" colorScheme="whiteAlpha">
                Docs
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="solid" colorScheme="whiteAlpha">
                Playground
              </Button>
            </Link>
          </HStack>
        </Box>

        {/* GitHub icon on the right */}
        <Link href="https://github.com/mvishiu11/CoreLox">
            <IconButton aria-label="GitHub">
                <FaGithub />
            </IconButton>
        </Link>
      </Flex>
    </Box>
  );
}
