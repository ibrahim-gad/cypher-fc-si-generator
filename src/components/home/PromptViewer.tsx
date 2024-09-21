import {PromptData} from "../../types/PromptTypes.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {defaultPrompt} from "../../lib/defaultPrompts.ts";
import {FaCopy} from "react-icons/fa";
import {copyToClipboard, extractAvailableData, extractInstructions, formatNamed} from "../../lib/helpers.ts";
import {useEffect, useState} from "react";
import {usePromptsBank} from "../../stores/usePromptsBank.tsx";
import rehypeRaw from 'rehype-raw';

const PromptViewer = ({promptData}:{promptData:PromptData}) => {
    const { promptBank } = usePromptsBank();
    const [prompt, setPrompt] = useState<string>(defaultPrompt);
    useEffect(() => {
        const dynamicReplacement = {
            "instructions": extractInstructions(promptData),
            "scenario": promptData.scenario,
            "example": promptBank.find(cat => cat.id === promptData.category)?.prompts?.find(item=>item.id===promptData.examplePrompt)?.prompt,
            "data": extractAvailableData(promptData),
        }
        setPrompt(formatNamed(defaultPrompt, dynamicReplacement));
        console.log(formatNamed(defaultPrompt, dynamicReplacement))
    }, [promptData]);
    console.log(promptData)
    return (
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <header className="mb-4 flex justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Prompt</h2>
                <button
                    onClick={() => copyToClipboard(prompt)}
                    className="p-2 bg-green-500 my-1 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                    <FaCopy className="text-white text-xl mr-2"/> Copy Prompt
                </button>
            </header>
            <div>
                <Markdown className="markdown-content" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {prompt}
                </Markdown>
            </div>
        </section>
    );
}
export default PromptViewer;