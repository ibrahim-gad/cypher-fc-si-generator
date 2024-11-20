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
        prompts: singleSchemaPrompts,
        gid: '0',
    },
    {
        id: '2',
        name: 'Function calling - Cypher-fc-multiple-schema',
        prompts: multipleSchemaPrompts,
        gid: '1948078990',
    },
    {
        id: '3',
        name: 'Function calling - Cypher-fc-dynamic-schema',
        prompts: dynamicSchemaPrompts,
        gid: '1607079615',
    },
    {
        id: '4',
        name: 'Cypher task - with use-case function calling',
        prompts: useCasePrompts,
        gid: '1779727287',
    },
    {
        id: '5',
        name: 'Cypher task - neo4j-sandbox-with-tools',
        prompts: sandboxPrompts,
        gid: '2042900022',
    }
];

export default defaultPromptBank;