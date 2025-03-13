"use client"
import ClientMDXLayout from "@/components/ClientMDXLayout";
import LoxIntro from "./LoxIntro.mdx";
import LoxTutorial from "./LoxTutorial.mdx";

export default function DocsPage() {
  return (
    <ClientMDXLayout>
      <LoxIntro />
      <LoxTutorial />
    </ClientMDXLayout>
  );
}
