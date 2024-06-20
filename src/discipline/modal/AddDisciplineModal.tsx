import React from "react";
import BaseModal from "../../components/BaseModal";
import DisciplineForm from "../form/DisciplineForm";
import { Discipline } from "../../services/apiFacade";

interface AddDisciplineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (discipline: Discipline) => void;
}

const AddDisciplineModal: React.FC<AddDisciplineModalProps> = ({ isOpen, onClose, onAdd }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Add Discipline</h2>
            <DisciplineForm onSubmit={onAdd} onClose={onClose} />
        </BaseModal>
    );
};

export default AddDisciplineModal;
