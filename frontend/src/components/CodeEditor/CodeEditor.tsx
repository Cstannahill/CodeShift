// src/components/CodeEditor/CodeEditor.tsx
import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "@/hooks/common/useTheme";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string | number;
  className?: string;
  options?: any;
}

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  readOnly = false,
  height = 400,
  className,
  options = {},
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const defaultOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    readOnly,
    ...options,
  };

  return (
    <div className={className} style={{ height }}>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(val) => onChange?.(val || "")}
        onMount={handleEditorDidMount}
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        options={defaultOptions}
        loading={<LoadingSpinner />}
      />
    </div>
  );
}
