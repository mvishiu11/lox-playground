"use client";

import dynamic from "next/dynamic";
import { EditorProps, Monaco } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false, 
});

export default function LoxEditor(props: EditorProps) {
  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.register({ id: "lox" });
    monaco.languages.setMonarchTokensProvider("lox", {
      tokenizer: {
        root: [
          [/"([^"\\]|\\.)*$/, "string.invalid"], 
          [/"([^"\\]|\\.)*"/, "string"],
          [/\/\/.*/, "comment"],
          [/\b\d+(\.\d+)?\b/, "number"],
          [
            /\b(class|fun|var|for|if|else|while|print|return|super|this|true|false|nil|and|or|switch|case|default|break|continue)\b/,
            "keyword"
          ],
          [/[ \t\r\n]+/, "white"],
          [/[a-zA-Z_]\w*/, "identifier"],
        ]
      }
    });

    monaco.languages.setLanguageConfiguration("lox", {
      comments: {
        lineComment: "//"
      },
      brackets: [
        ["(", ")"],
        ["{", "}"]
      ],
    });
  }

  return (
    <MonacoEditor
      height="300px"
      defaultLanguage="lox"
      beforeMount={handleEditorWillMount}
      {...props}
    />
  );
}
