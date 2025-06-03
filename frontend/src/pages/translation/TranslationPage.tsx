// src/features/translation/TranslationPage.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslationStore } from "@/lib/stores/translationStore";
import {
  useTranslateCode,
  useAnalyzeCode,
} from "@/hooks/queries/useTranslation";
import { useNotifications } from "@/hooks/common/useNotifications";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";

import { TranslationHistory } from "./TranslationHistory";
import {
  Code2,
  Play,
  Settings,
  History,
  Upload,
  Download,
  Share,
  ArrowLeftRight,
  Sparkles,
} from "lucide-react";
import { detectFramework } from "@/lib/utils/frameworks";
import { validateCode } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";
import { FrameworkSelector } from "@/components/features/translation/FrameworkSelector";
import { SplitCodeView } from "@/components/features/translation/SplitCodeView";
import { TranslationResult } from "@/components/features/translation/TranslationResult";
import { TranslationSettings } from "@/components/features/translation/TranslationSettings";

const SAMPLE_CODE = `import React, { useState } from 'react';

function TodoList({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false 
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-list">
      <input 
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo..."
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`;

export default function TranslationPage() {
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState("translate");
  const [translationSettings, setTranslationSettings] = useState({
    preserveStructure: true,
    modernSyntax: true,
    includeTypes: true,
    generateComments: false,
    optimizePerformance: true,
    confidenceThreshold: 0.8,
  });

  const {
    sourceCode,
    targetCode,
    sourceFramework,
    targetFramework,
    isTranslating,
    confidence,
    warnings,
    suggestions,
    setSourceCode,
    setFrameworks,
  } = useTranslationStore();

  const translateMutation = useTranslateCode();
  const analyzeMutation = useAnalyzeCode();

  // Initialize with sample code or URL params
  useEffect(() => {
    // const repoId = searchParams.get("repo"); // Future: load code from repo
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!sourceCode) {
      setSourceCode(SAMPLE_CODE);
    }

    if (from && to) {
      setFrameworks(from, to);
    }
  }, [searchParams, sourceCode, setSourceCode, setFrameworks]);

  // Auto-detect source framework when code changes
  useEffect(() => {
    if (sourceCode && !sourceFramework) {
      const detected = detectFramework(sourceCode);
      if (detected) {
        setFrameworks(detected, targetFramework || "");
      }
    }
  }, [sourceCode, sourceFramework, targetFramework, setFrameworks]);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      showNotification({
        type: "warning",
        title: "No code to translate",
        message: "Please enter some code to translate",
      });
      return;
    }

    if (!sourceFramework || !targetFramework) {
      showNotification({
        type: "warning",
        title: "Select frameworks",
        message: "Please select both source and target frameworks",
      });
      return;
    }

    const validation = validateCode(sourceCode);
    if (!validation.isValid) {
      showNotification({
        type: "error",
        title: "Code validation failed",
        message: validation.issues.join(", "),
      });
      return;
    }

    translateMutation.mutate(
      {
        code: sourceCode,
        sourceFramework,
        targetFramework,
        options: translationSettings,
      },
      {
        onSuccess: () => {
          showNotification({
            type: "success",
            title: "Translation completed",
            message: "Your code has been successfully translated",
          });
        },
        onError: (error) => {
          showNotification({
            type: "error",
            title: "Translation failed",
            message: error.message || "An error occurred during translation",
          });
        },
      }
    );
  };

  const handleAnalyze = () => {
    if (!sourceCode.trim() || !sourceFramework || !targetFramework) return;

    analyzeMutation.mutate({
      code: sourceCode,
      sourceFramework,
      targetFramework,
    });
  };

  const handleSwapFrameworks = () => {
    if (sourceFramework && targetFramework) {
      setFrameworks(targetFramework, sourceFramework);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSourceCode(content);
      };
      reader.readAsText(file);
    }
  };

  const canTranslate =
    sourceCode.trim() && sourceFramework && targetFramework && !isTranslating;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Code Translation"
        description="Translate code between frameworks with AI-powered intelligence"
      >
        <div className="flex gap-2">
          <input
            type="file"
            accept=".js,.jsx,.ts,.tsx,.vue,.py"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button variant="outline" asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </label>
          </Button>
          <Button
            onClick={handleTranslate}
            disabled={!canTranslate}
            loading={isTranslating}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Translate
          </Button>
        </div>
      </PageHeader>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="translate" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Translate
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="translate" className="space-y-6">
          {/* Framework Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Framework Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Source Framework
                  </label>
                  <FrameworkSelector
                    value={sourceFramework || ""}
                    onValueChange={(value) =>
                      setFrameworks(value, targetFramework || "")
                    }
                    placeholder="Select source framework"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSwapFrameworks}
                    disabled={!sourceFramework || !targetFramework}
                    title="Swap frameworks"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Target Framework
                  </label>
                  <FrameworkSelector
                    value={targetFramework || ""}
                    onValueChange={(value) =>
                      setFrameworks(sourceFramework || "", value)
                    }
                    placeholder="Select target framework"
                  />
                </div>
              </div>

              {/* Analysis Button */}
              {sourceFramework && targetFramework && (
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAnalyze}
                    loading={analyzeMutation.isPending}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Analyze Feasibility
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {analyzeMutation.data && (
                <div className="mt-4 p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Analysis Results
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        analyzeMutation.data.feasible
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {analyzeMutation.data.feasible
                        ? "Feasible"
                        : "Not Feasible"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence:{" "}
                    {Math.round(analyzeMutation.data.confidence * 100)}% •
                    Complexity: {analyzeMutation.data.estimatedComplexity}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Code Editor */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {targetCode ? (
                <SplitCodeView
                  sourceCode={sourceCode}
                  targetCode={targetCode}
                  sourceLanguage={
                    sourceFramework?.toLowerCase().includes("typescript")
                      ? "typescript"
                      : "javascript"
                  }
                  targetLanguage={
                    targetFramework?.toLowerCase().includes("typescript")
                      ? "typescript"
                      : "javascript"
                  }
                  sourceFramework={sourceFramework || undefined}
                  targetFramework={targetFramework || undefined}
                  onSourceChange={setSourceCode}
                />
              ) : (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5" />
                      Source Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <Textarea
                      value={sourceCode}
                      onChange={(e) => setSourceCode(e.target.value)}
                      placeholder="Paste your code here or upload a file..."
                      className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Sidebar */}
            <div className="space-y-6">
              {targetCode && (
                <TranslationResult
                  confidence={confidence}
                  warnings={warnings}
                  suggestions={suggestions}
                  packageChanges={[
                    { from: "react", to: "vue", version: "3.3.0" },
                    { from: "", to: "@vue/composition-api", version: "1.7.0" },
                  ]}
                />
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full"
                    disabled={!targetCode}
                    onClick={() => navigator.clipboard.writeText(targetCode)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={!targetCode}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Translation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={!targetCode}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Create Learning Path
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <TranslationSettings
            options={translationSettings}
            onChange={setTranslationSettings}
          />
        </TabsContent>

        <TabsContent value="history">
          <TranslationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
