import {create} from 'zustand';
import {Category, Prompt, SystemPromptFormat} from '../types/PromptTypes';
import defaultPromptBank from '../lib/defaultPromptBank';
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse';
import { persist, createJSONStorage } from 'zustand/middleware'

interface PromptsBankState {
    promptBank: Category[];
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;
    addPrompt: (categoryId: string, prompt: Prompt) => void;
    removePrompt: (categoryId: string, promptId: string) => void;
    syncPrompts: () => Promise<void>;
}

export const usePromptsBank = create<PromptsBankState>()(
    persist(
        (set) => (
            {
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
                        // @ts-expect-error
                        const lines: string[][] = Papa.parse(data, {
                            delimiter: ',',
                            quoteChar: '"',
                            skipEmptyLines: true
                        }).data;
                        const prompts: Prompt[] = [];

                        for (let index = 0; index < lines.length; index++) {
                            const line = lines[index];
                            const formats:  { [key: number]: SystemPromptFormat } = {
                                3: SystemPromptFormat.MARKDOWN,
                                6: SystemPromptFormat.TEXT,
                                9: SystemPromptFormat.MARKDOWN_WITH_XML,
                                12: SystemPromptFormat.TEXT_WITH_XML,
                                15: SystemPromptFormat.FULL_XML,
                                18: SystemPromptFormat.MARKDOWN,
                                21: SystemPromptFormat.TEXT,
                                24: SystemPromptFormat.MARKDOWN_WITH_XML,
                                27: SystemPromptFormat.TEXT_WITH_XML,
                                30: SystemPromptFormat.FULL_XML
                            };
                            const addressees: { [key: number]: string } = {
                                3: "assistant",
                                6: "assistant",
                                9: "assistant",
                                12: "assistant",
                                15: "assistant",
                                18: "third-person",
                                21: "third-person",
                                24: "third-person",
                                27: "third-person",
                                30: "third-person"
                            }
                            if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30].includes(index+1)) {
                                line.filter(cell => cell.trim() !== '').forEach((cell, i) => {
                                    const name = lines[index-1][i] || `Example ${i + 1}`;
                                    prompts.push({
                                        id: uuidv4(),
                                        format: formats[index+1],
                                        name: name,
                                        prompt: cell,
                                        addressee: addressees[index+1]
                                    });
                                });
                            }
                        }
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
            }),
        {
            name: 'prompts-bank-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )

);



