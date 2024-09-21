import MainForm from "../components/home/MainForm.tsx";
import Instructions from "../components/home/Instructions.tsx";
import PromptViewer from "../components/home/PromptViewer.tsx";
import {useState} from "react";
import {PromptData} from "../types/PromptTypes.ts";

const Home = () => {
    const [promptData, setPromptData] = useState<PromptData | null>(null);
    const formSubmitHandler = (data:PromptData) => {
        setPromptData(data)
    }
    return (
        <div className="w-full pb-6">
            <div className="container mx-auto p-6">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create SI for Cypher FC tasks</h1>
                </header>
                <Instructions/>
            </div>
            <div className="container mx-auto p-6">
                <MainForm formSubmitHandler={formSubmitHandler}/>
            </div>
            <div className="container mx-auto p-6">
                {promptData && <PromptViewer promptData={promptData}/>}
            </div>
        </div>
    )
}
export default Home;
