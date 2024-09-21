import React, { useState, useEffect } from 'react';
import {
    SystemPromptFormat,
    UserPromptFormat,
    AssistantResponseFormat,
    Prompt,
    PromptData
} from '../../types/PromptTypes';
import { usePromptsBank } from '../../stores/usePromptsBank.tsx';
import { Switch, Select, MenuItem, TextField, FormControl, Button, FormControlLabel, FormGroup, Box, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { formHelpText } from '../../lib/help-texts.tsx';
import InformationModal from "./InformationModal.tsx";
import { Visibility } from "@mui/icons-material";


interface MainFormProps {
    formSubmitHandler: (data: PromptData) => void;
}

const MainForm: React.FC<MainFormProps> = ({ formSubmitHandler }) => {
    const { promptBank } = usePromptsBank();
    const [addressee, setAddressee] = useState('assistant');
    const [category, setCategory] = useState('');
    const [siFormat, setSiFormat] = useState(SystemPromptFormat.MARKDOWN);
    const [userPromptFormat, setUserPromptFormat] = useState(UserPromptFormat.MARKDOWN);
    const [assistantResponseFormat, setAssistantResponseFormat] = useState(AssistantResponseFormat.MARKDOWN);
    const [examplePrompt, setExamplePrompt] = useState('');
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState(new Date());
    const [useTimeInDate, setUseTimeInDate] = useState(true);
    const [scenario, setScenario] = useState('');
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string|React.JSX.Element>('');
    const isFormValid = () => {
        return category && siFormat && addressee && examplePrompt && userPromptFormat && assistantResponseFormat && userName && scenario;
    };
    const handleOpenModal = (content: string|React.JSX.Element) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent('');
    };
    const handleOpenExamplePromptModal = () => {
        const selectedPrompt = prompts.find(prompt => prompt.id === examplePrompt);
        if (selectedPrompt) {
            setModalContent(selectedPrompt.prompt);
            setModalOpen(true);
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            category,
            siFormat,
            addressee,
            examplePrompt,
            userPromptFormat,
            assistantResponseFormat,
            userName,
            date,
            useTimeInDate,
            scenario
        }
        console.log("Form submitted with values:", data);
        formSubmitHandler(data);
    };
    useEffect(() => {
        if (category) {
            const selectedCategory = promptBank.find(cat => cat.id === category);
            setPrompts(selectedCategory ? selectedCategory.prompts.filter(item => item.format === siFormat && item.addressee === addressee) : []);
        } else {
            setPrompts([]);
        }
    }, [category, siFormat, addressee, promptBank]);

    useEffect(() => {
        const selectedPrompt = prompts.find(prompt => prompt.id === examplePrompt);
        if (!selectedPrompt) {
            setExamplePrompt('');
        }
    }, [prompts]);
    return (
        <form className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg" onSubmit={handleSubmit}>
            <header className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Generate Prompt</h2>
            </header>
            <Box className="bg-gray-200 p-2 pb-6 dark:bg-gray-600" display="flex" gap={2} flexDirection="column">
                <Box display="flex" gap={2}>
                    <FormControl fullWidth>
                        <label className="text-gray-900 dark:text-gray-100">
                            Category
                            <IconButton onClick={() => handleOpenModal(formHelpText.category)}>
                                <InfoIcon />
                            </IconButton>
                        </label>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as string)}
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            {promptBank.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">
                            SI Format
                        </label>
                        <Select
                            value={siFormat}
                            onChange={(e) => setSiFormat(e.target.value as SystemPromptFormat)}
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            {Object.values(SystemPromptFormat).map(format => (
                                <MenuItem key={format} value={format}>{format}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <label className="text-gray-900 dark:text-gray-100">
                            Addressee
                            <IconButton onClick={() => handleOpenModal(formHelpText.addressee)}>
                                <InfoIcon />
                            </IconButton>
                        </label>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={addressee === 'third-person'}
                                        onChange={() => setAddressee(addressee === 'assistant' ? 'third-person' : 'assistant')}
                                        name="addressee"
                                        color="primary"
                                    />
                                }
                                label="Addressee as a 3rd person"
                                className="text-gray-900 dark:text-gray-100"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
                <FormControl fullWidth>
                    <label className="text-gray-900 dark:text-gray-100">
                        Example SI
                        <IconButton onClick={() => handleOpenModal(formHelpText.examplePrompt)}>
                            <InfoIcon />
                        </IconButton>
                        {examplePrompt && (
                            <IconButton onClick={handleOpenExamplePromptModal}>
                                <Visibility />
                            </IconButton>
                        )}
                    </label>
                    <Select
                        value={examplePrompt}
                        onChange={(e) => setExamplePrompt(e.target.value as string)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        {prompts.map(prompt => (
                            <MenuItem key={prompt.id} value={prompt.id}>{prompt.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex" gap={2}>
                <FormControl fullWidth>
                    <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">
                        User Prompt Format
                    </label>
                    <Select
                        value={userPromptFormat}
                        onChange={(e) => setUserPromptFormat(e.target.value as UserPromptFormat)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        {Object.values(UserPromptFormat).map(format => (
                            <MenuItem key={format} value={format}>{format}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">
                        Assistant Response Format
                    </label>
                    <Select
                        value={assistantResponseFormat}
                        onChange={(e) => setAssistantResponseFormat(e.target.value as AssistantResponseFormat)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        {Object.values(AssistantResponseFormat).map(format => (
                            <MenuItem key={format} value={format}>{format}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex" gap={2}>
                <FormControl fullWidth>
                    <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">
                        Date
                    </label>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        value={date.toISOString().slice(0, 16)}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">Time
                    </label>
                    <Box display="flex" alignItems="center" flex={1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={useTimeInDate}
                                        onChange={() => setUseTimeInDate(!useTimeInDate)}
                                        name="useTimeInDate"
                                        color="primary"
                                    />
                                }
                                label="Use time in date"
                                className="text-gray-900 dark:text-gray-100"
                            />
                        </FormGroup>
                    </Box>
                </FormControl>
            </Box>
            <FormControl fullWidth>
                <label className="text-gray-900 dark:text-gray-100 h-10 flex items-center">
                    User Name
                </label>
                <TextField
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </FormControl>
            <FormControl fullWidth>
                <label className="text-gray-900 dark:text-gray-100">
                    Scenario
                    <IconButton onClick={() => handleOpenModal(formHelpText.scenario)}>
                        <InfoIcon />
                    </IconButton>
                </label>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </FormControl>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid()}
                    size={"large"}
                    type="submit"
                >
                    Build Prompt
                </Button>
            </Box>
            <InformationModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} modalContent={modalContent} />
        </form>
    );
};

export default MainForm;