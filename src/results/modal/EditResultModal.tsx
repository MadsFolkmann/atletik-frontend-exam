import React from "react";
import BaseModal from "../../components/BaseModal";
import ResultForm from "../form/resultForm";
import { Result } from "../../services/apiFacade";

interface EditResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (result: Result) => void;
    result: Result;
}

const EditResultModal: React.FC<EditResultModalProps> = ({ isOpen, onClose, onEdit, result }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Edit Result</h2>
            <ResultForm onSubmit={onEdit} onClose={onClose} result={result} />
        </BaseModal>
    );
};

export default EditResultModal;
