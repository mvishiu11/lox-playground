"use client";

import React from "react";
import { Provider } from "@/components/ui/provider";
import { MDXProvider } from "@mdx-js/react";

export default function ClientMDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div className="markdown-body">
        <MDXProvider>
          {children}
        </MDXProvider>
      </div>
    </Provider>
  );
}
