import {PromptData} from "../../types/PromptTypes.ts";

const PromptViewer = ({promptData}:{promptData:PromptData}) => {
    return (
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <header className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Prompt</h2>
            </header>
            <div>
                <h1>View Prompt</h1>
            </div>
        </section>
    );
}
export default PromptViewer;