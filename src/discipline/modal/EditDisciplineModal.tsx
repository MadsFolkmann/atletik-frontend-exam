import React from "react";
import BaseModal from "../../components/BaseModal";
import DisciplineForm from "../form/DisciplineForm";
import { Discipline } from "../../services/apiFacade";

interface EditDisciplineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (discipline: Discipline) => void;
    discipline: Discipline;
}

const EditDisciplineModal: React.FC<EditDisciplineModalProps> = ({ isOpen, onClose, onEdit, discipline }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Edit Discipline</h2>
            <DisciplineForm onSubmit={onEdit} onClose={onClose} discipline={discipline} />
        </BaseModal>
    );
};

export default EditDisciplineModal;
