const toolPurpose = (
    <div className="text-gray-900 dark:text-gray-100">
    This tool can help you with:
    <ul className="list-disc list-inside">
        <li>Generating a prompt to create an SI for cypher FC tasks.</li>
        <li>The generated prompt depend on the use case you insert and an example.</li>
        <li>You start by choosing a <em>category</em> and the <em>SI format</em> and <em>The Addressee</em>, this will filter the available examples with these variables for you.</li>
        <li>These 3 variable themselves also participate in building the prompt.</li>
        <li>This tool won't actually create the SI for you, you have to copy the prompt and give it ChatGpt or Claude or any LLM you like.</li>
        <li>Read the next point to know how to check if the produced SI is good or not.</li>
    </ul>
</div>
);
const systemPromptValidity = (
    <div className="text-gray-900 dark:text-gray-100">
    To know if the produced SI is good or not, you can check the following:
    <ul className="list-disc list-inside">
        <li>Is the prompt clear and concise?</li>
        <li>Does it contain all the necessary information?</li>
        <li>Does it follow the SI format?</li>
        <li>Does it follow the Addressee?</li>
        <li>Does it mention the User Prompt Format?</li>
        <li>Does it mention the Assistant Response Format?</li>
        <li>Does it mention the User Name?</li>
        <li>Does it mention the Date?</li>
        <li>Does it follow the Use Case?</li>
    </ul>
    </div>
)
const addressee = (
    <div className="text-gray-900 dark:text-gray-100">
    The addressee of the prompt:
        <ul className="list-disc list-inside">
            <li><strong>OFF:</strong> The SI is addressed to the assistant, i.e You are an assistant integrated in...</li>
            <li><strong>ON:</strong> The SI is addressed to a 3rd person, i.e An ideal assistant integrated in...</li>
        </ul>
    </div>
)
const scenario = (
    <div className="text-gray-900 dark:text-gray-100">
    The use case of the new SI:
        <ul className="list-disc list-inside">
            <li>This is the most important piece of information.</li>
            <li>Create the schema/schemas first, even if you still don't know what will you do in the conversation, because one schema can be suitable for a lot of conversations, but a conversation needs a specific schema.</li>
            <li>Use the <strong>Domain</strong>, <strong>Subdomain</strong>, and the <strong>schema/schemas</strong> as a base for this.</li>
            <li><strong>Don't just copy paste the scenario from the labeling tool.</strong></li>
            <li>Make this suitable for multiple conversations, not specific to one conversation, but suitable for a <strong>class</strong> of conversations. (Remember: you still have to do variants)</li>
        </ul>
    </div>
)
export const formHelpText = {
    category: (<p>The category of Cypher FC tasks <a className="text-blue-500 hover:text-blue-700 underline" target="_blank" href="https://docs.google.com/document/d/1q-BU9hsfkSrlIBKz6pGUfA8RL_n9ZxLt8Afx_OrYtnA/edit#heading=h.ktrz8acufgn6">See More</a></p>),
    siFormat: 'Information about SI Format',
    addressee: addressee,
    userPromptFormat: 'Information about User Prompt Format',
    assistantResponseFormat: 'Information about Assistant Response Format',
    examplePrompt: 'The example SI you want to base the new SI on, this is very useful since LLMs are good at learning by examples, choose an SI you want to mimic.',
    userName: 'Information about User Name',
    date: 'Information about Date',
    useTimeInDate: 'Information about Use time in date',
    scenario: scenario,
    toolPurpose: toolPurpose,
    systemPromptValidity: systemPromptValidity
};