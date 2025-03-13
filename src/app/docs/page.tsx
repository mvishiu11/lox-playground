"use client";
import MDXContent from "./DocsContent.mdx";
import ClientMDXLayout from "@/components/ClientMDXLayout";

export default function DocsPage() {
  return (
    <ClientMDXLayout>
      <MDXContent />
    </ClientMDXLayout>
  );
}