import {SystemPromptFormat} from "../types/PromptTypes.ts";

export const dynamicSchemaPrompts = [
  {
    "id": "dynamic-1",
    "format": SystemPromptFormat.MARKDOWN,
    "name": "Single schema with markdown format basic example",
    "prompt": "This is a default prompt in markdown format.",
    "addressee": "assistant"
  }
]