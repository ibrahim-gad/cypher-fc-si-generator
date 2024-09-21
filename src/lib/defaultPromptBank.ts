// src/constants/defaultPromptBank.ts
import { Category, SystemPromptFormat } from '../types/PromptTypes';

const defaultPromptBank: Category[] = [
    {
        id: '1',
        name: 'Function calling - Cypher-fc-single-schema',
        prompts: [
            {
                id: '1',
                format: SystemPromptFormat.MARKDOWN,
                name: 'Default Prompt',
                prompt: 'This is a default prompt in markdown format.',
                addressee: 'assistant'
            }
        ]
    },
    {
        id: '2',
        name: 'Function calling - Cypher-fc-multiple-schema',
        prompts: [
            {
                id: '1',
                format: SystemPromptFormat.MARKDOWN,
                name: 'Default Prompt',
                prompt: 'This is a default prompt in markdown format.',
                addressee: 'assistant'
            }
        ]
    },
    {
        id: '3',
        name: 'Function calling - Cypher-fc-dynamic-schema',
        prompts: [
            {
                id: '1',
                format: SystemPromptFormat.MARKDOWN,
                name: 'Default Prompt',
                prompt: 'This is a default prompt in markdown format.',
                addressee: 'assistant'
            }
        ]
    },
    {
        id: '4',
        name: 'Cypher task - with use-case function calling',
        prompts: [
            {
                id: '1',
                format: SystemPromptFormat.MARKDOWN,
                name: 'Default Prompt',
                prompt: 'This is a default prompt in markdown format.',
                addressee: 'assistant'
            }
        ]
    },
    {
        id: '5',
        name: 'Cypher task - neo4j-sandbox-with-tools',
        prompts: [
            {
                id: '1',
                format: SystemPromptFormat.MARKDOWN,
                name: 'Default Prompt',
                prompt: 'This is a default prompt in markdown format.',
                addressee: 'assistant'
            }
        ]
    }
];

export default defaultPromptBank;