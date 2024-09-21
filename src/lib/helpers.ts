import {toast} from "react-toastify";
import {AssistantResponseFormat, PromptData, SystemPromptFormat, UserPromptFormat} from "../types/PromptTypes.ts";

export const formatNamed = (template: string, params: { [key: string]: any }) => {
    return template.replace(/{([^}]+)}/g, (match, key) => {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            // If the value is multiline, indent all lines after the first one
            if (typeof value === 'string' && value.includes('\n')) {
                const lines = value.split('\n');
                const indentMatch = match.match(/^\s*/);
                const indent = indentMatch ? indentMatch[0] : '';  // Get the indentation of the placeholder
                return lines[0] + '\n' + lines.slice(1).map(line => indent + line).join('\n');
            }
            return value;
        }
        return match;
    });
}

export const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
        console.log("Text copied to clipboard");
        toast.success("Text copied to clipboard");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
};
export const extractInstructions = ({category, siFormat, addressee, userPromptFormat, assistantResponseFormat,}:PromptData) => {
    console.log(category)
    let instructions = "";
    const formatInstructionsMap: { [key in SystemPromptFormat]: string } = {
        [SystemPromptFormat.MARKDOWN]: "- The system prompt is in markdown format.\n",
        [SystemPromptFormat.MARKDOWN_WITH_XML]: "- The system prompt is in markdown format with XML.\n",
        [SystemPromptFormat.TEXT]: "- The system prompt is in text format.\n",
        [SystemPromptFormat.TEXT_WITH_XML]: "- The system prompt is in text format with XML.\n",
        [SystemPromptFormat.FULL_XML]: "- The system prompt is in full XML format.\n",
    };

    if (formatInstructionsMap[siFormat]) {
        instructions += formatInstructionsMap[siFormat];
    }
    if (addressee === "assistant") {
        instructions += `- The system prompt should start with "You are an assistant" or something similar.\n`;
    }
    else {
        instructions += "- The system prompt needs to be in 3rd person format, so instead of saying, \"you are an assistant\", say \"the assistant\" or \"An ideal assistant\".\n"
    }
    const userPromptFormatInstructionsMap: { [key in UserPromptFormat]: string } = {
    [UserPromptFormat.MARKDOWN]: "- The llm should expect that the user prompt will be in markdown format.\n",
    [UserPromptFormat.TEXT]: "- The llm should expect that the user prompt will be in text format.\n",
    [UserPromptFormat.XML]: "- The llm should expect that the user prompt will be in XML format.\n",
    [UserPromptFormat.HTML]: "- The llm should expect that the user prompt will be in HTML format.\n",
    [UserPromptFormat.JSON]: "- The llm should expect that the user prompt will be in JSON format.\n",
};

    if (userPromptFormatInstructionsMap[userPromptFormat]) {
        instructions += userPromptFormatInstructionsMap[userPromptFormat];
    }
    const assistantResponseFormatInstructionsMap: { [key in AssistantResponseFormat]: string } = {
        [AssistantResponseFormat.MARKDOWN]: "- The llm should provide the response in markdown format unless otherwise instructed by the user.\n",
        [AssistantResponseFormat.TEXT]: "- The llm should provide the response in text format unless otherwise instructed by the user.\n",
        [AssistantResponseFormat.XML]: "- The llm should provide the response in XML format unless otherwise instructed by the user.\n",
        [AssistantResponseFormat.HTML]: "- The llm should provide the response in HTML format unless otherwise instructed by the user.\n",
        [AssistantResponseFormat.JSON]: "- The llm should provide the response in JSON format unless otherwise instructed by the user.\n",
    };

    if (assistantResponseFormatInstructionsMap[assistantResponseFormat]) {
        instructions += assistantResponseFormatInstructionsMap[assistantResponseFormat];
    }

    return instructions;
}
export const extractAvailableData = ({userName, date, useTimeInDate}:PromptData) => {
    let availableData = "";
    if (userName) {
        availableData += `- User name: ${userName}\n`;
    }
    if (date) {
        availableData += `- Date: ${date.toDateString()}${useTimeInDate ? ` ${date.toTimeString()}` : ''}\n`;
    }
    return availableData;
}
