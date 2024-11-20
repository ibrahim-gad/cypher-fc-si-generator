// src/types/PromptTypes.ts
export enum SystemPromptFormat {
    MARKDOWN = 'markdown',
    MARKDOWN_WITH_XML = 'markdown-with-xml',
    TEXT = 'text',
    TEXT_WITH_XML = 'text-with-xml',
    FULL_XML = 'full-xml'
}

export interface Prompt {
    id: string;
    format: SystemPromptFormat;
    name: string;
    prompt: string;
    addressee: string
}

export interface Category {
    id: string;
    name: string;
    prompts: Prompt[];
    gid: string;
}

export enum UserPromptFormat {
    MARKDOWN = 'markdown',
    TEXT = 'text',
    XML = 'xml',
    HTML = 'html',
    JSON = 'json'
}

export enum AssistantResponseFormat {
    MARKDOWN = 'markdown',
    TEXT = 'text',
    XML = 'xml',
    HTML = 'html',
    JSON = 'json'
}
export interface PromptData {
    category: string;
    siFormat: SystemPromptFormat;
    addressee: string;
    examplePrompt: string;
    userPromptFormat: UserPromptFormat;
    assistantResponseFormat: AssistantResponseFormat;
    userName: string;
    date: Date;
    useTimeInDate: boolean;
    scenario: string;
}