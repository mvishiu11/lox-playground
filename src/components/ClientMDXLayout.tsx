"use client";
import React from "react";
import { Provider } from "./ui/provider";
import { Box } from "@chakra-ui/react";

export default function ClientMDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Box p={4}>{children}</Box>
    </Provider>
  );
}