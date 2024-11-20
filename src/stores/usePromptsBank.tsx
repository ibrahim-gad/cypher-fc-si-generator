import {create} from 'zustand';
import {Category, Prompt, SystemPromptFormat} from '../types/PromptTypes';
import defaultPromptBank from '../lib/defaultPromptBank';
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse';

interface PromptsBankState {
    promptBank: Category[];
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;
    addPrompt: (categoryId: string, prompt: Prompt) => void;
    removePrompt: (categoryId: string, promptId: string) => void;
    syncPrompts: () => Promise<void>;
}

export const usePromptsBank = create<PromptsBankState>((set) => ({
    promptBank: defaultPromptBank,
    addCategory: (category) => set((state) => ({
        promptBank: [...state.promptBank, category]
    })),
    removeCategory: (categoryId) => set((state) => ({
        promptBank: state.promptBank.filter(category => category.id !== categoryId)
    })),
    addPrompt: (categoryId, prompt) => set((state) => ({
        promptBank: state.promptBank.map(category =>
            category.id === categoryId
                ? { ...category, prompts: [...category.prompts, prompt] }
                : category
        )
    })),
    removePrompt: (categoryId, promptId) => set((state) => ({
        promptBank: state.promptBank.map(category =>
            category.id === categoryId
                ? { ...category, prompts: category.prompts.filter(prompt => prompt.id !== promptId) }
                : category
        )
    })),
    syncPrompts: async () => {
        async function fetchGoogleSheet(spreadsheetId: string, sheetId: string) {
            const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${sheetId}`;

            try {
                const response = await fetch(url);
                const data = await response.text();
                return data;
            } catch (error) {
                console.error('Error fetching spreadsheet:', error);
                return null;
            }
        }
        const formatCategoryData = (data: string): Prompt[] => {
            const lines = Papa.parse(data, {
                delimiter: ',',
                quoteChar: '"',
                skipEmptyLines: true
            }).data;
            const prompts: Prompt[] = [];

            lines.forEach((line: string[], index: number) => {
                switch (index+1) {
                    case 3:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.MARKDOWN,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "assistant"
                            });
                        });
                        break;
                    case 6:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.TEXT,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "assistant"
                            });
                        });
                        break;
                    case 9:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.MARKDOWN_WITH_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "assistant"
                            });
                        });
                        break;
                    case 12:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.TEXT_WITH_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "assistant"
                            });
                        });
                        break;
                    case 15:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.FULL_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "assistant"
                            });
                        });
                        break;
                    case 18:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.MARKDOWN,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "third-person"
                            });
                        });
                        break;
                    case 21:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.TEXT,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "third-person"
                            });
                        });
                        break;
                    case 24:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.MARKDOWN_WITH_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "third-person"
                            });
                        });
                        break;
                    case 27:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.TEXT_WITH_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "third-person"
                            });
                        });
                        break;
                    case 30:
                        line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                            prompts.push({
                                id: uuidv4(),
                                format: SystemPromptFormat.FULL_XML,
                                name: `Example ${i+1}`,
                                prompt: cell,
                                addressee: "third-person"
                            });
                        });
                        break;
                }
            });

            return prompts;
        };
        for (const category of defaultPromptBank) {
            const fetchedPrompts = await fetchGoogleSheet("1Elz_qsKCuEPGeL6p1FbozsMDl823bo4VWq3N7KJ38eA", category.gid);
            const categoryData: Prompt[] = formatCategoryData(fetchedPrompts || "");
            set((state) => ({
                promptBank: [
                    ...state.promptBank.filter(_category=>_category.id != category.id),
                    {
                        ...category,
                        prompts: categoryData
                    }
                ]}));
        }
    },
}));



