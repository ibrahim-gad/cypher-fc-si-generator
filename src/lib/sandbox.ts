import {SystemPromptFormat} from "../types/PromptTypes.ts";

export const sandboxPrompts = [
  {
    "id": "sandbox-1",
    "format": SystemPromptFormat.MARKDOWN,
    "name": "Single schema with markdown format basic example",
    "prompt": "This is a default prompt in markdown format.",
    "addressee": "assistant"
  }
]