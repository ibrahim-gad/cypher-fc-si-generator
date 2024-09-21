import { motion } from "framer-motion";

import MetaDataForm from "../components/pipeline/MetaDataForm.tsx";
import usePipelineContext from "../stores/usePipelineContext.tsx";
import PipelineStep from "../components/pipeline/PipelineStep.tsx";

const Pipeline = ( )=>  {
    const { step} = usePipelineContext()

    return (
            <div className="w-full py-12">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <MetaDataForm/>
                </motion.div>
                {Array.from({ length: step }, (_, index) => index + 1).map((stepNumber) => (
                    <PipelineStep key={stepNumber} currentStep={stepNumber} />
                ))}
            </div>
    )
}
export default Pipeline;