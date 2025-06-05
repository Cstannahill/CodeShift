# Fine-Tuning Dataset Guidelines

This document provides recommendations for preparing datasets when training or fine-tuning models within the CodeShift platform.

## Recommended Structure

```
{"prompt": "<input text>", "completion": "<expected output>"}
```

- Use JSONL (one JSON object per line) or CSV with `prompt` and `completion` columns.
- Ensure UTF-8 encoding.
- Keep examples concise but representative of the task.

## Example

```
{"prompt": "Translate React component to Vue", "completion": "<translated code>"}
```

## Best Practices

1. **Consistency** – maintain consistent style in prompts and completions.
2. **Diversity** – include a variety of edge cases and common scenarios.
3. **Cleaning** – remove personally identifiable or sensitive information.
4. **Formatting** – ensure code snippets are properly formatted and valid.

## Tips for CodeShift Use Cases

- For code translation, include examples of common patterns in the source and target frameworks.
- For learning path generation, pair questions or tasks with ideal responses.

