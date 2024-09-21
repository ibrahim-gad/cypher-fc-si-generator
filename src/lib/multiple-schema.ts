import {SystemPromptFormat} from "../types/PromptTypes.ts";

export const multipleSchemaPrompts = [
  {
    "id": "multiple-1",
    "format": SystemPromptFormat.MARKDOWN,
    "name": "Multiple schema with markdown format basic example",
    "prompt": "This is a default prompt in markdown format.",
    "addressee": "assistant"
  }
]