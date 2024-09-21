// src/constants/defaultPromptBank.ts
import { Category } from '../types/PromptTypes';
import {singleSchemaPrompts} from "./single-schema.ts";
import {multipleSchemaPrompts} from "./multiple-schema.ts";
import {dynamicSchemaPrompts} from "./dynamic-schema.ts";
import {useCasePrompts} from "./use-case.ts";
import {sandboxPrompts} from "./sandbox.ts";

const defaultPromptBank: Category[] = [
    {
        id: '1',
        name: 'Function calling - Cypher-fc-single-schema',
        prompts: singleSchemaPrompts
    },
    {
        id: '2',
        name: 'Function calling - Cypher-fc-multiple-schema',
        prompts: multipleSchemaPrompts
    },
    {
        id: '3',
        name: 'Function calling - Cypher-fc-dynamic-schema',
        prompts: dynamicSchemaPrompts
    },
    {
        id: '4',
        name: 'Cypher task - with use-case function calling',
        prompts: useCasePrompts
    },
    {
        id: '5',
        name: 'Cypher task - neo4j-sandbox-with-tools',
        prompts: sandboxPrompts
    }
];

export default defaultPromptBank;