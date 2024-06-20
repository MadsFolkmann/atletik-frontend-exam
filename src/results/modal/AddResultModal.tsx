import React from "react";
import BaseModal from "../../components/Modals/BaseModal";
import ResultForm from "../../components/Forms/resultForm";
import { Result } from "../../services/apiFacade";

interface AddResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (result: Result) => void;
}

const AddResultModal: React.FC<AddResultModalProps> = ({ isOpen, onClose, onAdd }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Add Result</h2>
            <ResultForm onSubmit={onAdd} onClose={onClose} />
        </BaseModal>
    );
};

export default AddResultModal;
