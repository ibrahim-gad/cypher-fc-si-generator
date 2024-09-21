// src/stores/usePromptsBank.tsx
import {create} from 'zustand';
import {Category, Prompt} from '../types/PromptTypes';
import defaultPromptBank from '../lib/defaultPromptBank';

interface PromptsBankState {
    promptBank: Category[];
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;
    addPrompt: (categoryId: string, prompt: Prompt) => void;
    removePrompt: (categoryId: string, promptId: string) => void;
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
    }))
}));