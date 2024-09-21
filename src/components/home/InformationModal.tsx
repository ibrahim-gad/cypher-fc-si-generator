import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface InformationModalProps {
    modalOpen: boolean;
    handleCloseModal: () => void;
    modalContent: string|React.JSX.Element;
}

const InformationModal: React.FC<InformationModalProps> = ({ modalOpen, handleCloseModal, modalContent }) => {
    return (
        <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded shadow-lg"
                style={{ maxWidth: '90%', width: '75%' }}
            >
                <Typography id="modal-title" variant="h6" className="text-gray-900 dark:text-gray-100 flex items-center justify-between">
                    Information
                    <IconButton
                        onClick={handleCloseModal}
                        className="ml-auto"
                    >
                        <CloseIcon className="text-gray-900 dark:text-gray-100" />
                    </IconButton>
                </Typography>
                <Typography id="modal-description" className="text-gray-900 dark:text-gray-100">
                    {modalContent}
                </Typography>
                <Box className="flex justify-end">
                    <Button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white dark:bg-blue-700">
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InformationModal;