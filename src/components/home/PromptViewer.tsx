import {PromptData} from "../../types/PromptTypes.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {defaultPrompt} from "../../lib/defaultPrompts.ts";
import {FaCopy, FaEdit, FaSave} from "react-icons/fa";
import {copyToClipboard, extractAvailableData, extractInstructions, formatNamed} from "../../lib/helpers.ts";
import React, {useEffect, useState} from "react";
import {usePromptsBank} from "../../stores/usePromptsBank.tsx";
import rehypeRaw from 'rehype-raw';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {Box, Button, Card, CardContent, CardHeader} from "@mui/material";

interface PromptControllersProps {
    isEditing: boolean;
    handleSave: () => void;
    setIsEditing: (isEditing: boolean) => void;
    prompt: string;
}

const PromptControllers: React.FC<PromptControllersProps> = ({isEditing, handleSave, setIsEditing, prompt}) => {
    return (
        <Box display="flex" gap={2}>
            {isEditing ? (
                <Button
                    variant="contained"
                    color="info"
                    size="medium"
                    onClick={handleSave}
                    startIcon={<FaSave />}
                >
                    Save Prompt
                </Button>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        onClick={() => setIsEditing(true)}
                        startIcon={<FaEdit />}
                    >
                        Edit Prompt
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="medium"
                        onClick={() => copyToClipboard(prompt)}
                        startIcon={<FaCopy />}
                    >
                        Copy Prompt
                    </Button>
                </>
            )}
        </Box>
    );
}

const PromptViewer = ({promptData}: { promptData: PromptData }) => {
    const {promptBank} = usePromptsBank();
    const [prompt, setPrompt] = useState<string>(defaultPrompt);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const dynamicReplacement = {
            "instructions": extractInstructions(promptData),
            "scenario": promptData.scenario,
            "example": promptBank.find(cat => cat.id === promptData.category)?.prompts?.find(item => item.id === promptData.examplePrompt)?.prompt,
            "data": extractAvailableData(promptData),
        }
        setPrompt(formatNamed(defaultPrompt, dynamicReplacement));
    }, [promptData, promptBank]);

    const handleSave = () => {
        setIsEditing(false);
        // Save the prompt if needed
    };

    return (
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader
                title="Prompt"
                className="text-gray-900 dark:text-gray-100"
                action={<PromptControllers isEditing={isEditing} handleSave={handleSave} setIsEditing={setIsEditing} prompt={prompt} />}
            />
            <CardContent className="text-gray-900 dark:text-gray-100">
                {isEditing ? (
                    <MdEditor
                        value={prompt}
                        style={{height: "750px"}}
                        renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{text}</Markdown>}
                        onChange={({ text }) => setPrompt(text)}
                    />
                ) : (
                    <Markdown className="markdown-content" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {prompt}
                    </Markdown>
                )}
                <Box display="flex" justifyContent="end" mt={2}>
                    <PromptControllers isEditing={isEditing} handleSave={handleSave} setIsEditing={setIsEditing} prompt={prompt}/>
                </Box>
            </CardContent>
        </Card>
    );
}
export default PromptViewer;